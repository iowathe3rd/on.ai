"use client";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { updateDiagram } from "@/lib/actions/editor.actions";
import { cn } from "@/lib/utils";
import { edgesAtom, editorStore, nodesAtom } from "@/store/editor";
import { useUser } from "@clerk/nextjs";
import { Panel } from "reactflow";

interface Actions {
	name: string;
	shortcut?: string;
	color?: string;
	handler: <T>(data?: T) => void;
}

interface ActionsGroup {
	title: string;
	tools: Actions[];
}

export default function Toolbar({ id }: { id: string }) {
	const { user } = useUser();
	const state = {
		nodes: editorStore.get(nodesAtom),
		edges: editorStore.get(edgesAtom),
	};

	const saveHandler = async () => {
		await updateDiagram({
			id: id,
			data: state,
		});
	};

	const actions: ActionsGroup[] = [
		{
			title: "File",
			tools: [
				{ name: "Save", shortcut: "⌘S", handler: saveHandler },
				{ name: "Export", shortcut: "⌘ shift S", handler: () => {} },
				{ name: "Save & Exit", shortcut: "⌘ shift S", handler: () => {} },
				{
					name: "Exit",
					shortcut: "⌘ shift S",
					color: "red !important",
					handler: () => {},
				},
			],
		},
		{
			title: "Edit",
			tools: [
				{ name: "Undo", shortcut: "⌘Z", handler: () => {} },
				{ name: "Redo", shortcut: "⌘Y", handler: () => {} },
				{ name: "Cut", shortcut: "⌘X", handler: () => {} },
				{ name: "Copy", shortcut: "⌘C", handler: () => {} },
				{ name: "Paste", shortcut: "⌘V", handler: () => {} },
				{ name: "Delete", shortcut: "⌫", handler: () => {} },
			],
		},
	];
	return (
		<Panel position={"top-left"}>
			<Menubar>
				{actions.map((toolGroup, index) => (
					<MenubarMenu key={index}>
						<MenubarTrigger>{toolGroup.title}</MenubarTrigger>
						<MenubarContent>
							{toolGroup.tools.map((tool, index) => (
								<MenubarItem
									key={index}
									className={cn(`bg-${tool.color}`)}
									onClick={() => tool.handler()}
								>
									s{tool.name}{" "}
									{tool.shortcut && (
										<MenubarShortcut>{tool.shortcut}</MenubarShortcut>
									)}
								</MenubarItem>
							))}
							{index !== actions.length - 1 && <MenubarSeparator />}
						</MenubarContent>
					</MenubarMenu>
				))}
			</Menubar>
		</Panel>
	);
}
