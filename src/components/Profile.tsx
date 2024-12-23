import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileProps {
  open: boolean;
  onClose: () => void;
}

const Profile = ({ open, onClose }: ProfileProps) => {
  const { toast } = useToast();
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    toast({
      title: "Success",
      description: "Logged out successfully!",
    });
    window.location.href = "/";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#1A1F2C] text-white border-[#9b87f5]">
        <DialogHeader>
          <DialogTitle className="text-[#9b87f5]">Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-[#9b87f5] flex items-center justify-center text-3xl font-bold">
              {userDetails.name ? userDetails.name[0].toUpperCase() : "U"}
            </div>
          </div>
          
          <div className="space-y-2">
            <p><span className="text-[#8E9196]">Name:</span> {userDetails.name}</p>
            <p><span className="text-[#8E9196]">Email:</span> {userDetails.email}</p>
            <p><span className="text-[#8E9196]">Age:</span> {userDetails.age}</p>
            <p><span className="text-[#8E9196]">City:</span> {userDetails.city}</p>
          </div>

          <Button 
            onClick={handleLogout}
            className="w-full bg-[#F97316] hover:bg-[#F97316]/80"
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;