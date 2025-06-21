import { Outlet } from "react-router";

import Sidebar from "@/components/shared/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default AppLayout;
