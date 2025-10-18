import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "@/Api/authApi";
import { UserContext } from "@/Context/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const menuItems = [
    { name: "Home", path: "/home" },
    { name: "Entry", path: "/entry" },
    { name: "Meals", path: "/meal" },
    { name: "Summary", path: "/summery" },
    { name: "Admin", path: "/admin" },
  ];

  const {role,setRole} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      setRole(null);
      navigate('/'); 
    } catch (error) {
      console.log('Logout failed:', error);
    }
  };

  if (!role) return null;

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold text-blue-600">Saleha Villa</div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            {item.name}
          </Link>
        ))}
        <Button
          variant="destructive"
          size="sm"
          onClick={handleLogout}
          className="ml-4"
        >
          Logout
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent position="right" size="sm" className="p-6">
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="mt-4"
              >
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
