import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Panel } from "reactflow";

interface Actions {
  name: string;
  shortcut?: string;
  color?: string
}

interface ActionsGroup {
  title: string;
  tools: Actions[];
}
const actions: ActionsGroup[] = [
  {
    title: 'File',
    tools: [
      { name: 'Save', shortcut: '⌘S' },
      { name: 'Export', shortcut: "⌘ shift S" },
      { name: 'Save & Exit', shortcut: "⌘ shift S" },
      { name: 'Exit', shortcut: "⌘ shift S", color: "red !important" },
    ]
  },
  {
    title: 'Edit',
    tools: [
      { name: 'Undo', shortcut: '⌘Z' },
      { name: 'Redo', shortcut: '⌘Y' },
      { name: 'Cut', shortcut: '⌘X' },
      { name: 'Copy', shortcut: '⌘C' },
      { name: 'Paste', shortcut: '⌘V' },
      { name: 'Delete', shortcut: '⌫' }
    ]
  }
];

export default function Toolbar() {

  return (
    <Panel position={"top-left"}>
      <Menubar>
        {actions.map((toolGroup, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger>{toolGroup.title}</MenubarTrigger>
            <MenubarContent>
              {toolGroup.tools.map((tool, index) => (
                <MenubarItem key={index} className={cn(`bg-${tool.color}`)}>
                  {tool.name} {tool.shortcut && <MenubarShortcut>{tool.shortcut}</MenubarShortcut>}
                </MenubarItem>
              ))}
              {index !== actions.length - 1 && <MenubarSeparator />}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
    </Panel>
  )
}
