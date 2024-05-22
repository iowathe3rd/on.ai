import { Node, Position, XYPosition } from "reactflow";

declare interface CreateUserParams {
  clerkId: string,
  email: string,
  username: string,
  firstName?: string | null,
  lastName?: string | null,
}

// Интерфейс для данных узла
declare interface NodeData {
  label: string;
  onChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  sourcePosition: Position
}

// Интерфейс для узла с пользовательскими данными
declare interface CustomNode extends Node<NodeData> {
  id: string;
  type: string;
  position: XYPosition;
  data: NodeData;
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
