import Image from "next/image";
import { DragEvent, useCallback } from "react";
import { Panel, useReactFlow } from "reactflow";
import { Button } from "../ui/button";
import { Menubar } from "../ui/menubar";


export default function Blocks() {
	const { setViewport, zoomIn, zoomOut } = useReactFlow();

	const handleTransform = useCallback(() => {
		setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
	}, [setViewport]);

	const onDragStart = (event: DragEvent<HTMLButtonElement>) => {
		console.log("Drag start!"); // Добавьте это для проверки
		event.dataTransfer.setData("application/reactflow", "default");
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<Panel position={"top-center"} className='flex gap-2'>
			<Menubar>
				<Button
					variant={"ghost"}
					size={"sm"}
					onDragStart={(event) => {
						onDragStart(event);
					}}
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
