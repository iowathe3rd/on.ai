import { PropsWithChildren } from "react";
import 'reactflow/dist/style.css';


export default function EditorLayout(props: PropsWithChildren) {
  return (
    <div className="w-full h-screen">{props.children}</div>
  )
}
