"use client"
import { PropsWithChildren } from "react";
import "reactflow/dist/style.css";

import {editorStore} from "@/store/editor";
import { Provider } from "jotai";

export default function EditorLayout(props: PropsWithChildren) {
	return <div className='w-full h-screen'><Provider store={editorStore}>{props.children}</Provider></div>;
}
