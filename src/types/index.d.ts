import {DefaultEdgeOptions, Edge, Node} from "reactflow";

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

declare interface CustomNode extends Node<NodeData> {
	onDelete: (id: string) => void;
	onChange: (id: string, value: string) => void;
}

// Интерфейс для состояния редактора
declare interface EditorState {
	nodes: CustomNode[];
	edges: CustomEdge[];
}
