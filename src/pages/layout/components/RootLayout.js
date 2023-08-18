import SideBar from "../../../layout/Sidebar";
import { Outlet } from "react-router-dom";
import Users from "../../../layout/User";
import "./index.css"

const RootLayout = () => {
  return (
    <div className="container">
        <Outlet /> {/* Render Outlet component here */}
      <SideBar />
      <Users />
    </div>
  );
}

export default RootLayout;
