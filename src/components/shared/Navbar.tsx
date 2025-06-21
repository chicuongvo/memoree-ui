import { Home, Plus, Users } from "lucide-react";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-10">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <NavLink to="/">
          <Home className="w-5 h-5" />
        </NavLink>
        <NavLink to="/upload">
          <Plus className="w-5 h-5" />
        </NavLink>
        <NavLink to="/friends">
          <Users className="w-5 h-5" />
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
