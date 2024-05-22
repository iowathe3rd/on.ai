"use client"

import Blocks from "@/components/editor/Blocks";
import Toolbar from "@/components/editor/Toolbar";
import ReactFlow, { Background, Controls, Panel } from "reactflow";

const edges = [{ id: '1-2', source: '1', target: '2' }];

const nodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 0, y: 0 },
    type: 'input',
  },
  {
    id: '2',
    data: { label: 'World' },
    position: { x: 100, y: 100 },
  },
];

export default function EditorPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ height: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} >
        <Toolbar />
        <Blocks />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}
