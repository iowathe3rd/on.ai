import { Edge, Node } from "reactflow";

declare interface CreateUserParams {
	clerkId: string;
	email: string;
	username: string;
	firstName?: string | null;
	lastName?: string | null;
}

declare interface NodeData {
	label: string;
}

declare interface CustomNode extends Node<NodeData, "node-with-toolbar"> {
	onDelete: (id: string) => void;
	onChange: (id: string, value: string) => void;
}

// Интерфейс для рёбер
declare interface CustomEdge extends Edge {
	id: string;
	source: string;
	target: string;
}

// Интерфейс для состояния редактора
declare interface EditorState {
	nodes: CustomNode[];
	edges: CustomEdge[];
}

// Интерфейс для ответа от API при сохранении состояния
declare interface SaveStateResponse {
	message: string;
}
