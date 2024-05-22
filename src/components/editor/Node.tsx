"use client"
import { ChangeEvent, useState } from 'react';
import { Handle, NodeToolbar, Position } from 'reactflow';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface NodeData {
  label: string;
  onChange: (id: string, value: string) => void;
  onDelete: (id: string) => void;
}

interface NodeProps {
  id: string;
  data: NodeData;
}

export const Node = ({ id, data }: NodeProps) => {
  const [value, setValue] = useState(data.label);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    data.onChange(id, event.target.value);
  };

  const handleDelete = () => {
    data.onDelete(id);
  };

  return (
    <div className='border border-border rounded-lg h-fit'>
      <NodeToolbar
        position={Position.Top}
        className='flex gap-2'
      >
        <Button size={"sm"} variant={"outline"} onClick={handleDelete}>delete</Button>
        <Button size={"sm"} variant={"outline"}>copy</Button>
        <Button size={"sm"} variant={"outline"}>paste</Button>
      </NodeToolbar>
      <Textarea value={value} onChange={handleChange} className='w-full mt-2' />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};


export const nodeTypes = {
  'node-with-toolbar': Node,
};
