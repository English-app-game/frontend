import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="h-screen w-screen">
      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
