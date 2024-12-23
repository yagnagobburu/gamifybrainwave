import { useState } from "react";
import { UserCircle } from "lucide-react";
import { Button } from "./ui/button";
import Profile from "./Profile";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <nav className="bg-[#1A1F2C] shadow-md">
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
            <span className="text-xl font-bold text-[#9b87f5]">NeuroQuest</span>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setShowProfile(true)}
            className="text-[#8E9196] hover:text-[#9b87f5]"
          >
            <UserCircle className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <Profile open={showProfile} onClose={() => setShowProfile(false)} />
    </nav>
  );
};

export default Navbar;