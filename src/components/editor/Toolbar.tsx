import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { useState } from "react";
import { Panel } from "reactflow";

interface Actions {
  name: string;
  shortcut?: string;
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
    <Panel position={"top-center"}>
      <Menubar>
        {actions.map((toolGroup, index) => (
          <MenubarMenu key={index}>
            <MenubarTrigger>{toolGroup.title}</MenubarTrigger>
            <MenubarContent>
              {toolGroup.tools.map((tool, index) => (
                <MenubarItem key={index}>
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
