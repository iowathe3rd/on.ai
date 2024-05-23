"use client"

import {ReactFlowProvider} from "reactflow";
import {PropsWithChildren} from "react";

export default function Layout ({children}: PropsWithChildren) {
    return <ReactFlowProvider>{children}</ReactFlowProvider>
}
