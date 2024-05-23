import { CustomNode } from "@/types";
import { useAtom } from "jotai/index";
import { nodesAtom } from "@/store/editor";

export const createNode = (data: Omit<CustomNode, "id">): void => {
	const [nodes, setNodes] = useAtom(nodesAtom);
	const id = crypto.randomUUID();
	setNodes((nds: CustomNode[]) =>
		nds.concat({
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
	const [nodes, setNodes] = useAtom(nodesAtom);
	setNodes((nds) => nds.filter((node) => node.id !== id));
};

export const changeNode = (id: string, value: string): void => {
	const [nodes, setNodes] = useAtom(nodesAtom);
	setNodes((nds) =>
		nds.map((node) =>
			node.id === id ? { ...node, data: { ...node.data, label: value } } : node
		)
	);
};
