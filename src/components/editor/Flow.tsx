"use client";
import ReactFlow, {
	addEdge,
	Background,
	BackgroundVariant,
	Controls,
	MiniMap,
	NodeTypes,
	OnConnect,
	useReactFlow,
} from "reactflow";
import Blocks from "@/components/editor/Blocks";
import Toolbar from "@/components/editor/Toolbar";
import { nodeTypes } from "@/components/editor/Node";
import { edgesAtom, nodesAtom } from "@/store/editor";
import { DragEventHandler, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuTrigger,
} from "../ui/context-menu";
import {
	loadStateFromLocalStorage,
	LOCAL_STORAGE_KEY,
	saveStateToLocalStorage,
	useEdgeChangeHandler,
	useNodeChangeHandler,
} from "@/lib/editor/utils";
import { createNode } from "@/lib/editor/handlers";

export default function Flow() {
	const { screenToFlowPosition } = useReactFlow();
	const [nodes, setNodes] = useAtom(nodesAtom);
	const [edges, setEdges] = useAtom(edgesAtom);

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

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			createNode({
				type: "node-with-toolbar",
				data: {
					label: "Начните писать...",
				},
				position,
			});
		},
		[setNodes]
	);

	const handleNodesChange = useNodeChangeHandler();
	const handleEdgesChange = useEdgeChangeHandler();

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

	return (
		<ContextMenu>
			<ContextMenuTrigger className='flex w-full h-full'>
				<div className='w-full h-full'>
					<div className='reactflow-wrapper w-full h-screen'>
						<ReactFlow
							nodeTypes={nodeTypes as unknown as NodeTypes}
							nodes={nodes}
							edges={edges}
							onNodesChange={handleNodesChange}
							onEdgesChange={handleEdgesChange}
							onConnect={onConnect}
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
			<ContextMenuContent className='w-64'></ContextMenuContent>
		</ContextMenu>
	);
}
