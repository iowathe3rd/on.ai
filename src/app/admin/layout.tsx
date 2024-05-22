import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full ">
        <Navbar />
        <div className="p-2 md:p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
