import {
	edgeChangesAtom,
	edgesAtom,
	nodeChangesAtom,
	nodesAtom,
} from "@/store/editor";
import { CustomNode } from "@/types";
import { useAtom } from "jotai";
import {
	Edge,
	EdgeChange,
	NodeChange,
	applyEdgeChanges,
	applyNodeChanges,
} from "reactflow";

export const useNodeChangeHandler = () => {
	const [, setNodes] = useAtom(nodesAtom);
	const [, setNodeChanges] = useAtom(nodeChangesAtom);

	return (changes: NodeChange[]) => {
		setNodes(
			(prevNodes: CustomNode[]) =>
				applyNodeChanges(changes, prevNodes) as CustomNode[]
		);
		setNodeChanges(changes);
	};
};

export const useEdgeChangeHandler = () => {
	const [, setEdges] = useAtom(edgesAtom);
	const [, setEdgeChanges] = useAtom(edgeChangesAtom);

	return (changes: EdgeChange[]) => {
		setEdges((edges) => applyEdgeChanges(changes, edges) as Edge[]);
		setEdgeChanges(changes);
	};
};

export const LOCAL_STORAGE_KEY = "editor_save";

export const saveStateToLocalStorage = (key: string, state: any) => {
	localStorage.setItem(key, JSON.stringify(state));
};

export const loadStateFromLocalStorage = (key: string) => {
	const state = localStorage.getItem(key);
	return state ? JSON.parse(state) : null;
};
