import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 flex flex-col w-full">
        <SidebarTrigger />
        <div className="py-4 flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
}
