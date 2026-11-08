import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "../components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
     return (
    <SidebarProvider>
      <DashboardSidebar/>
      <main>
        <SidebarTrigger className={'cursor-pointer'} />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;