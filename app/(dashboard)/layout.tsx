import SidebarMenu from "@/components/SidebarMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-lime-200/60 text-gray-400 backdrop-blur-3xl rounded-tr-4xl">
            <SidebarMenu/>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
