import {CustomEdge, CustomNode} from "@/types";
import { atom, createStore } from "jotai";
import { Edge, EdgeChange, NodeChange, ReactFlowInstance } from "reactflow";

// Исходные состояния для узлов, рёбер, инстанса React Flow, истории изменений узлов и рёбер
const initialNodes: CustomNode[] = [];
const initialEdges: CustomEdge[] = [];
const initialReactFlowInstance: ReactFlowInstance | null = null;
const initialNodeChanges: NodeChange[] = [];
const initialEdgeChanges: EdgeChange[] = [];

// Создание атомов для всех состояний
export const nodesAtom = atom<CustomNode[]>(initialNodes);
export const edgesAtom = atom<CustomEdge[]>(initialEdges);
export const reactFlowInstanceAtom = atom<ReactFlowInstance | null>(
	initialReactFlowInstance
);
export const nodeChangesAtom = atom<NodeChange[]>(initialNodeChanges);
export const edgeChangesAtom = atom<EdgeChange[]>(initialEdgeChanges);

export const copiedNodeAtom = atom<CustomNode | null>(null);

// Создание хранилища и добавление в него всех атомов
export const editorStore = createStore();

editorStore.set(nodesAtom, initialNodes);
editorStore.set(edgesAtom, initialEdges);
editorStore.set(reactFlowInstanceAtom, initialReactFlowInstance);
editorStore.set(nodeChangesAtom, initialNodeChanges);
editorStore.set(edgeChangesAtom, initialEdgeChanges);
