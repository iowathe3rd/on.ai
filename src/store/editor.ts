import { atom } from 'jotai';
import { Edge, EdgeChange, Node, NodeChange, ReactFlowInstance } from 'reactflow';

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export const nodesAtom = atom<Node[]>(initialNodes);
export const edgesAtom = atom<Edge[]>(initialEdges);

export const reactFlowInstanceAtom = atom<ReactFlowInstance | null>(null);

// Атому истории изменений узлов и ребер
export const nodeChangesAtom = atom<NodeChange[]>([]);
export const edgeChangesAtom = atom<EdgeChange[]>([]);
