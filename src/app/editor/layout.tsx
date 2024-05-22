import { PropsWithChildren } from "react";
import { ReactFlowProvider } from "reactflow";
import 'reactflow/dist/style.css';


export default function EditorLayout(props: PropsWithChildren) {
  return (
    <div className="w-full h-screen">
      <ReactFlowProvider>{props.children}</ReactFlowProvider></div>
  )
}
