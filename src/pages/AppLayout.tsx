import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div>
      <div>AppLayout</div>
      <Outlet />
    </div>
  );
}

export default AppLayout;
