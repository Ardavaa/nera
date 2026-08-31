import { MobileFrame } from "../../components/common/MobileFrame";
import { ParentBottomNav } from "../../components/parent/ParentBottomNav";

export default function ParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileFrame bottomNav={<ParentBottomNav />}>{children}</MobileFrame>;
}
