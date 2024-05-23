"use client";
import {ChangeEvent, ComponentType, useState} from "react";
import {Handle, NodeProps, NodeResizer, NodeToolbar, Position} from "reactflow";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {CustomNode} from "@/types";
import {copyNode} from "@/lib/editor/utils";

export const Node = ({ id, data, selected }: CustomNode) => {
	const [value, setValue] = useState(data.label);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
		data.onChange(id, event.target.value);
	};

	const handleDelete = () => {
		data.onDelete(id);
	};


	const handleCopy = () => {
		copyNode(id);
	};

	return (
		<div className='h-full p-2'>
			<NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} />

			<NodeToolbar position={Position.Top} className='flex gap-2 border border-border p-1 rounded-lg'>
				<Button size={"sm"} variant={"outline"} onClick={handleDelete}>
					delete
				</Button>
				<Button size={"sm"} variant={"outline"} onClick={handleCopy}>
					copy
				</Button>
				<Button size={"sm"} variant={"outline"}>
					paste
				</Button>
			</NodeToolbar>
			<Textarea value={value} onChange={handleChange} className='w-full h-full resize-none' />

			<Handle type='target' position={Position.Left} />
			<Handle type='source' position={Position.Right} />
		</div>
	);
};

export const nodeTypes = {
	"node-with-toolbar": Node,
};
