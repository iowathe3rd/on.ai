"use client";
import Blocks from "@/components/editor/Blocks";
import ConnectionLine from "@/components/editor/ConnectionLine";
import { nodeTypes } from "@/components/editor/Node";
import Toolbar from "@/components/editor/Toolbar";
import { createNode } from "@/lib/editor/handlers";
import {
    LOCAL_STORAGE_KEY,
    loadStateFromLocalStorage,
    useEdgeChangeHandler,
    useNodeChangeHandler,
} from "@/lib/editor/utils";
import { edgesAtom, nodesAtom } from "@/store/editor";
import { useAtom } from "jotai";
import { DragEventHandler, useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    OnConnect,
    addEdge,
    useReactFlow,
} from "reactflow";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuTrigger,
} from "../ui/context-menu";

export default function Flow({id}: {id: string}) {
	const reactFlowWrapper = useRef(null);

	const { screenToFlowPosition } = useReactFlow();
	const [nodes, setNodes] = useAtom(nodesAtom);
	const [edges, setEdges] = useAtom(edgesAtom);
 const [isLoadedFromLocalStorage, setIsLoadedFromLocalStorage] = useState(false);


	const onConnect: OnConnect = useCallback(
		(params) => setEdges((eds) => [...eds, ...addEdge(params, eds)]),
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

			if (typeof type === 'undefined' || !type) {
				return;
			}
			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			createNode({
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

	// Загружаем состояние из Local Storage при первой загрузке компонента
    useEffect(() => {
        const savedState = loadStateFromLocalStorage(LOCAL_STORAGE_KEY);
        if (savedState && !isLoadedFromLocalStorage) {
            setNodes(savedState.nodes);
            setEdges(savedState.edges);
            setIsLoadedFromLocalStorage(true);
        }
    }, [setNodes, setEdges, isLoadedFromLocalStorage]);


	return (
		<ContextMenu>
			<ContextMenuTrigger className='flex w-full h-full'>
				<div ref={reactFlowWrapper} className='w-full h-full'>
					<ReactFlow
						nodeTypes={nodeTypes}
						nodes={nodes}
						edges={edges}
						onNodesChange={handleNodesChange}
						onEdgesChange={handleEdgesChange}
						onConnect={onConnect}
						onDrop={onDrop}
						onDragOver={onDragOver}
						connectionLineComponent={ConnectionLine}
						fitView
					>
						<Controls />
						<Blocks />
						<Toolbar id={id}/>
						<MiniMap nodeStrokeWidth={3} zoomable pannable />
						<Background color='#ccc' variant={BackgroundVariant.Dots} />
					</ReactFlow>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className='w-64'></ContextMenuContent>
		</ContextMenu>
	);
}
