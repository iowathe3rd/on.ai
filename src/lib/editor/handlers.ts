import { edgeChangesAtom, edgesAtom, nodeChangesAtom, nodesAtom } from '@/store/editor';
import { useAtom } from 'jotai';
import { EdgeChange, Node, NodeChange, applyEdgeChanges, applyNodeChanges } from 'reactflow';

export const useNodeChangeHandler = () => {
  const [, setNodes] = useAtom(nodesAtom);
  const [, setNodeChanges] = useAtom(nodeChangesAtom);

  return (changes: NodeChange[]) => {
    setNodes((nodes: Node[]) => applyNodeChanges(changes, nodes));
    setNodeChanges(changes);
  };
};

export const useEdgeChangeHandler = () => {
  const [, setEdges] = useAtom(edgesAtom);
  const [, setEdgeChanges] = useAtom(edgeChangesAtom);

  return (changes: EdgeChange[]) => {
    setEdges((edges) => applyEdgeChanges(changes, edges));
    setEdgeChanges(changes);
  };
};


export const LOCAL_STORAGE_KEY = "editor_save"

export const saveStateToLocalStorage = (key: string, state: any) => {
  localStorage.setItem(key, JSON.stringify(state));
};

export const loadStateFromLocalStorage = (key: string) => {
  const state = localStorage.getItem(key);
  return state ? JSON.parse(state) : null;
};

export const saveStateToDatabase = async (state: any) => {
  try {
    const response = await fetch('/api/saveState', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    return await response.json();
  } catch (error) {
    console.error('Error saving state to database:', error);
  }
};
