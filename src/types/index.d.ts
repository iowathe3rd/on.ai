import { Edge, Node, Position, XYPosition } from "reactflow";

declare interface CreateUserParams {
	clerkId: string;
	email: string;
	username: string;
	firstName?: string | null;
	lastName?: string | null;
}

declare interface NodeData {
	label: string;
	onChange?: (id: string, value: string) => void;
	onDelete?: (id: string) => void;
}

declare interface CustomNode extends Node<NodeData, "node-with-toolbar"> {}

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
