import { CustomNode } from "@/types";
import {nodesAtom, editorStore, copiedNodeAtom} from "@/store/editor";

export const createNode = (data: Omit<CustomNode, "id">): void => {
	const id = crypto.randomUUID();
	editorStore.set(nodesAtom, (prevNodes: CustomNode[]) =>
		prevNodes.concat({
			...data,
			id: id,
			data: {
				label: "Начните писать",
				onChange: changeNode,
				onDelete: deleteNode,
			},
			type: "node-with-toolbar",
		})
	);
};
export const deleteNode = (id: string): void => {
	editorStore.set(nodesAtom, (nds) => nds.filter((node) => node.id !== id));
};

export const changeNode = (id: string, value: string): void => {
	editorStore.set(nodesAtom, (nds) =>
		nds.map((node) =>
			node.id === id ? { ...node, data: { ...node.data, label: value } } : node
		)
	);
};

export const copyNode = (id: string) => {
	const nodes = editorStore.get(nodesAtom);
	const nodeToCopy = nodes.find(node => node.id === id);
	editorStore.set(copiedNodeAtom, nodeToCopy ? { ...nodeToCopy, id: crypto.randomUUID() } : null);
};

export const pasteNode = (position: { x: number, y: number }) => {
	const copiedNode = editorStore.get(copiedNodeAtom);
	if (copiedNode) {
		const newNode = { ...copiedNode, position };
		editorStore.set(nodesAtom, (nodes) => [...nodes, newNode]);
		editorStore.set(copiedNodeAtom, null); // Очистка буфера после вставки
	}
};
