"use client"

import Blocks from "@/components/editor/Blocks";
import { nodeTypes } from "@/components/editor/Node";
import Toolbar from "@/components/editor/Toolbar";
import { LOCAL_STORAGE_KEY, loadStateFromLocalStorage, saveStateToDatabase, saveStateToLocalStorage, useEdgeChangeHandler, useNodeChangeHandler } from "@/lib/editor/handlers";
import { createNode } from "@/lib/utils";
import { edgesAtom, nodesAtom, reactFlowInstanceAtom } from "@/store/editor";
import { useAtom } from "jotai";
import { DragEventHandler, useCallback, useEffect, useRef } from "react";
import ReactFlow, { Background, BackgroundVariant, Controls, MiniMap, OnConnect, ReactFlowProvider, addEdge } from "reactflow";


export default function EditorPage() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const [reactFlowInstance, setReactFlowInstance] = useAtom(reactFlowInstanceAtom);

  const onConnect: OnConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver: DragEventHandler<HTMLDivElement> = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop: DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance!.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = createNode(type, position, '', handleNodeChange, handleNodeDelete);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const addNode = (label: string) => {
    const position = { x: Math.random() * 250, y: Math.random() * 250 };
    const newNode = createNode('node-with-toolbar', position, label, handleNodeChange, handleNodeDelete);
    setNodes((nds) => nds.concat(newNode));
  };

  const handleNodeChange = (id: string, value: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: value } } : node
      )
    );
  };

  const handleNodeDelete = (id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

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

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      const state = { nodes, edges };
      await saveStateToDatabase(state);
      const confirmationMessage = 'Are you sure you want to leave?';
      event.returnValue = confirmationMessage; // Gecko, Trident, Chrome 34+
      return confirmationMessage; // Gecko, WebKit, Chrome <34
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [nodes, edges]);


  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <div className="reactflow-wrapper w-full h-screen" ref={reactFlowWrapper}>
          <ReactFlow
            nodeTypes={nodeTypes}
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
            <Background color="#ccc" variant={BackgroundVariant.Dots} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  )
}
