import { SidebarMain } from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarMain>
        <main className="h-full">
          <div className="h-full max-w-[1056px] mx-auto pt-6">{children}</div>
        </main>
      </SidebarMain>
    </>
  );
};

export default DashboardLayout;
