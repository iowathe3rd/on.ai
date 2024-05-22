import { CustomNode } from "@/types";
import { randomUUID } from "node:crypto";
import { Position, XYPosition } from "reactflow";

interface CreateNodeInput {
  label: string;
  type: "default" | "node-with-toolbar";
  position: XYPosition,
  onChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  sourcePosition?: Position;
  targetPosition?: Position;

}

export const createNode = (params: CreateNodeInput): CustomNode => {
  const id = randomUUID();
  const { label, onChange, onDelete, type = 'node-with-toolbar', position } = params;

  return {
    id,
    type,
    position,
    data: {
      label: label,
      onChange,
      onDelete,
      sourcePosition: params.sourcePosition
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
};
