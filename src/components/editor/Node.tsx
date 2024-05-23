"use client";
import { ChangeEvent, useState } from "react";
import { Handle, NodeResizer, NodeToolbar, Position } from "reactflow";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CustomNode } from "@/types";
import { copyNode } from "@/lib/editor/handlers";

export const Node = (props: CustomNode) => {
	const [value, setValue] = useState(props.data.label);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
		props.onChange(props.id, event.target.value);
	};

	const handleDelete = () => {
		props.onDelete(props.id);
	};

	const handleCopy = () => {
		copyNode(props.id);
	};

	return (
		<div className='h-full p-2'>
			<NodeResizer
				color='#ff0071'
				isVisible={props.selected}
				minWidth={100}
				minHeight={30}
			/>

			<NodeToolbar
				position={Position.Top}
				className='flex gap-2 border border-border p-1 rounded-lg'
			>
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
			<Textarea
				value={value}
				onChange={handleChange}
				className='w-full h-full resize-none'
			/>

			<Handle type='target' position={Position.Left} />
			<Handle type='source' position={Position.Right} />
		</div>
	);
};

export const nodeTypes = {
	"node-with-toolbar": Node,
};
