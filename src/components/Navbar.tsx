import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    toast({
      title: "Success",
      description: "Logged out successfully!",
    });
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="NeuroQuest Logo"
              className="h-8 w-8 mr-2"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg";
              }}
            />
            <span className="text-xl font-bold text-primary">NeuroQuest</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <UserCircle className="h-6 w-6 text-gray-600" />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;