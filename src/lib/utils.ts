import { clsx, type ClassValue } from "clsx";
import { Node, Position } from "reactflow";
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

let id = 0;
const getId = () => `dndnode_${id++}`;

export const createNode = (
  type: string,
  position: { x: number; y: number },
  label: string,
  onChange: (id: string, value: string) => void,
  onDelete: (id: string) => void
): Node => {
  return {
    id: getId(),
    type,
    position,
    data: { label, onChange, onDelete },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
};
