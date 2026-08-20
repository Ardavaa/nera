import { CampusSidebar } from "../../components/campus/CampusSidebar";

export default function CampusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      <CampusSidebar />
      <main className="flex-1 p-8 max-w-[1200px]">{children}</main>
    </div>
  );
}
