import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserContext } from "@/Context/UserContext";
import { getmealByUser, updateMealStatus } from "@/Api/mealApi";
import { getAllUsers } from "@/Api/authApi";

const MealTracker = () => {
  const { userId: loggedInUserId } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [mealStatus, setMealStatus] = useState([]);

  // 🧩 Fetch all users for tabs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        const userList = res.data.data;
        setUsers(userList);
        if (userList.length > 0) setActiveUser(userList[0]._id);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  // 🍱 Fetch meals for active user
  useEffect(() => {
    const fetchAndInitMeals = async () => {
      if (!activeUser) return;

      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const initial = Array.from({ length: daysInMonth }, (_, i) => ({
        date: i + 1,
        noon: false,
        night: false,
      }));

      try {
        const response = await getmealByUser(activeUser);
        const meals = response.data.data;

        meals.forEach((m) => {
          const dayIndex = m.date - 1;
          if (initial[dayIndex]) {
            initial[dayIndex].noon = m.noon;
            initial[dayIndex].night = m.night;
          }
        });
        setMealStatus(initial);
      } catch (error) {
        console.error("Failed to fetch meals:", error);
      }
    };

    fetchAndInitMeals();
  }, [activeUser]);

  // ✅ Handle checkbox toggle and update meal
  const handleCheck = async (day, type) => {
    const updatedStatus = mealStatus.map((d) =>
      d.date === day ? { ...d, [type]: !d[type] } : d
    );
    setMealStatus(updatedStatus);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    try {
      await updateMealStatus({
        userId: activeUser,
        date: dateStr,
        mealType: type,
        status: updatedStatus.find((d) => d.date === day)[type],
      });
    } catch (error) {
      console.error("Failed to save meal status:", error);
    }
  };

  return (
    <div className="p-6 space-y-6 overflow-x-auto">
      {/* 🧭 User Tabs */}
      <Tabs value={activeUser} onValueChange={setActiveUser}>
        <TabsList className="flex flex-nowrap gap-2 pb-2 overflow-x-auto">
          {users.map((user) => (
            <TabsTrigger
              key={user._id}
              value={user._id}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md font-medium whitespace-nowrap transition-all ${
                activeUser === user._id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {user.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 🧾 Table for active user */}
        <TabsContent value={activeUser}>
          <Table className="border border-gray-300 min-w-[300px] table-auto">
            <TableHeader>
              <TableRow className="border-b border-gray-300">
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Noon</TableHead>
                <TableHead className="text-center">Night</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mealStatus.map((day) => {
                const today = new Date();
                const isEditable = day.date <= today.getDate(); // only today editable

                return (
                  <TableRow key={day.date} className="border-b border-gray-200">
                    <TableCell className="text-center">{day.date}</TableCell>
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={day.noon}
                        onChange={() => handleCheck(day.date, "noon")}
                        className="w-5 h-5"
                        disabled={!isEditable}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={day.night}
                        onChange={() => handleCheck(day.date, "night")}
                        className="w-5 h-5"
                        disabled={!isEditable}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealTracker;
