import { CustomNode } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { randomUUID } from "crypto";
import { Position, XYPosition } from "reactflow";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    // This is a native JavaScript error (e.g., TypeError, RangeError)
    console.error(error.message);
    throw new Error(`Error: ${error.message}`);
  } else if (typeof error === 'string') {
    // This is a string error message
    console.error(error);
    throw new Error(`Error: ${error}`);
  } else {
    // This is an unknown type of error
    console.error(error);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
};

interface NodeParams {
  label: string;
  onChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  sourcePosition: Position
}

export const createNode = (type: string, position: XYPosition, params: NodeParams): CustomNode => {
  const id = randomUUID();
  const { label, onChange, onDelete } = params;

  return {
    id,
    type,
    position,
    data: params,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
};
