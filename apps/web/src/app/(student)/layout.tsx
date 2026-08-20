import { MobileFrame } from "../../components/common/MobileFrame";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MobileFrame>{children}</MobileFrame>;
}
