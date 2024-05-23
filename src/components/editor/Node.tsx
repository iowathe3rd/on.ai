"use client";
import {ChangeEvent, ComponentType, useState} from "react";
import {Handle, NodeProps, NodeToolbar, NodeTypes, Position} from "reactflow";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { CustomNode } from "@/types";
import {changeNode, copyNode, deleteNode} from "@/lib/editor/handlers";

export const Node = (props: CustomNode) => {
	const [value, setValue] = useState(props.data.label);

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(event.target.value);
		changeNode(props.id, event.target.value);
	};

	const handleDelete = () => {
		deleteNode(props.id);
	};

	const handleCopy = () => {
		copyNode(props.id);
	};

	return (
		<div className='h-full p-0'>

			<NodeToolbar
				position={Position.Top}
				className='flex gap-2 border border-border rounded-lg'
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
				className='w-full h-full resize-none min-h-[100px]'
			/>

			<Handle type='target' position={Position.Left} />
			<Handle type='source' position={Position.Right} />
		</div>
	);
};

export const nodeTypes: NodeTypes = {
	"default": Node as unknown as ComponentType<NodeProps>,
};
