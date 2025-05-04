import { BottomBarComponent } from "@/compnents-general/Dashboard/BottomBar/BottomBarComponent";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {

  return (
    <>
      {children}
      <BottomBarComponent/>
    </>
  );
}