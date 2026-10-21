import { CampusMobileNav, CampusSidebar } from "../../components/campus/CampusSidebar";

export default function CampusLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F1F2F4] lg:flex">
      <CampusSidebar />
      <CampusMobileNav />
      <main className="min-w-0 w-full max-w-[1200px] flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
