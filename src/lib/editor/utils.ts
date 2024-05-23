import { CustomNode } from "@/types";
import {nodesAtom, editorStore} from "@/store/editor";

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
