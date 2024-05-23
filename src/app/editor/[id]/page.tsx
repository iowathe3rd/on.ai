"use client";

import Blocks from "@/components/editor/Blocks";
import { nodeTypes } from "@/components/editor/Node";
import Toolbar from "@/components/editor/Toolbar";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import { updateDiagram } from "@/lib/actions/editor.actions";
import {
	loadStateFromLocalStorage,
	LOCAL_STORAGE_KEY,
	saveStateToLocalStorage,
	useEdgeChangeHandler,
	useNodeChangeHandler,
} from "@/lib/editor/handlers";
import {changeNode, createNode, deleteNode, pasteNode} from "@/lib/editor/utils";
import { edgesAtom, nodesAtom, reactFlowInstanceAtom } from "@/store/editor";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import {DragEventHandler, MouseEventHandler, useCallback, useEffect, useRef} from "react";
import ReactFlow, {
	addEdge,
	Background,
	BackgroundVariant,
	Controls,
	MiniMap, NodeTypes,
	OnConnect,
	ReactFlowProvider,
    useReactFlow,
} from "reactflow";

export default function EditorPage() {
	const { user } = useUser();
	const { screenToFlowPosition } = useReactFlow();
	const reactFlowWrapper = useRef(null);
	const [nodes, setNodes] = useAtom(nodesAtom);
	const [edges, setEdges] = useAtom(edgesAtom);
	const [reactFlowInstance, setReactFlowInstance] = useAtom(
		reactFlowInstanceAtom
	);

	const onConnect: OnConnect = useCallback(
		(params) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);

	const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
		(event) => {
			event.preventDefault();
			const type = event.dataTransfer.getData("application/reactflow");
			if (!type) return;

			const position = reactFlowInstance!.screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			createNode({
				type: "node-with-toolbar",
				data: {
					label: "Начните писать...",
					onDelete: deleteNode,
					onChange: changeNode
				},
				position: position,
			});
		},
		[reactFlowInstance, setNodes]
	);

	const handleNodesChange = useNodeChangeHandler();
	const handleEdgesChange = useEdgeChangeHandler();

	const handlePaste: MouseEventHandler = useCallback(
		(event) => {
			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY
			});
			pasteNode(position);
		},
		[screenToFlowPosition]
	);

	useEffect(() => {
		const savedState = loadStateFromLocalStorage(LOCAL_STORAGE_KEY);
		if (savedState) {
			setNodes(savedState.nodes);
			setEdges(savedState.edges);
		}
	}, [setNodes, setEdges]);

	useEffect(() => {
		const state = { nodes, edges };
		saveStateToLocalStorage(LOCAL_STORAGE_KEY, state);
	}, [nodes, edges]);

	useEffect(() => {
		const handleBeforeUnload = async () => {
			const state = { nodes, edges };
			await updateDiagram({
				name: "",
				data: state,
				clerkId: user!.id,
			});
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [nodes, edges]);

	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex w-full h-full">
				<div className='w-full h-full'>
					<div
						className='reactflow-wrapper w-full h-screen'
						ref={reactFlowWrapper}
					>
						<ReactFlow
							nodeTypes={nodeTypes as unknown as NodeTypes}
							nodes={nodes}
							edges={edges}
							onNodesChange={handleNodesChange}
							onEdgesChange={handleEdgesChange}
							onConnect={onConnect}
							onInit={setReactFlowInstance}
							onDrop={onDrop}
							onDragOver={onDragOver}
							fitView
						>
							<Controls />
							<Blocks />
							<Toolbar />
							<MiniMap nodeStrokeWidth={3} zoomable pannable />
							<Background color='#ccc' variant={BackgroundVariant.Dots} />
						</ReactFlow>
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuItem onClick={(event)=>handlePaste(event)}>Paste Node</ContextMenuItem>
				{/* Другие элементы контекстного меню */}
			</ContextMenuContent>
		</ContextMenu>
	);
}
