import React from "react";
import { Button } from "@/components/ui/button";
import { deleteAll } from "@/Api/authApi";

const Admin = () => {
  const handleClearAll = async() => {
    try{
        await deleteAll();
    }catch(error){
        alert("Failed to clear data")
    }
  };

  return (
    <div className="p-6">
      <Button variant="destructive" onClick={handleClearAll}>
        Clear All
      </Button>
    </div>
  );
};

export default Admin;

