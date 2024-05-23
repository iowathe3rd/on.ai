import Image from "next/image";
import { DragEvent, useCallback, useState } from "react";
import { Panel, useReactFlow } from "reactflow";
import { Button } from "../ui/button";
import { Menubar } from "../ui/menubar";
import { createNode } from "@/lib/editor/handlers";

interface Tool {
	name: string;
	shortcut?: string; // Изменим тип на string, чтобы использовать его для обработки событий в JS
	icon: string; // Добавим свойство для пути к иконке
}

const tools: Tool[] = [
	{ name: "Select Mode", icon: "/icons/select-mode.svg" },
	{ name: "Hand Mode", icon: "/icons/hand-mode.svg" },
];

export default function Blocks() {
	const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
	const { setViewport, zoomIn, zoomOut } = useReactFlow();

	const handleTransform = useCallback(() => {
		setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
	}, [setViewport]);

	const handleToolClick = (tool: Tool) => {
		setSelectedTool(tool);
	};

	const onDragStart = (event: DragEvent<HTMLButtonElement>) => {
		event.dataTransfer.setData("application/reactflow", "node-with-toolbar");
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<Panel position={"top-center"} className='flex gap-2'>
			<Menubar>
				{tools.map((tool, index) => (
					<Button
						key={index}
						variant={"ghost"}
						size={"sm"}
						onClick={() => handleToolClick(tool)}
					>
						<Image width={20} height={20} src={tool.icon} alt={tool.name} />
					</Button>
				))}
			</Menubar>
			<Menubar>
				<Button
					variant={"ghost"}
					size={"sm"}
					onDragStart={(event) => onDragStart(event)}
					onClick={() =>
						createNode({
							position: { x: 0, y: 0 },
							data: {
								label: "HT",
							},
						})
					}
					draggable
				>
					<Image width={20} height={20} src={"/icons/plus.svg"} alt={"add"} />
				</Button>
				<Button
					variant={"ghost"}
					size={"sm"}
					onClick={handleTransform}
					draggable
				>
					<Image width={20} height={20} src={"/icons/plus.svg"} alt={"add"} />
				</Button>
			</Menubar>
		</Panel>
	);
}
