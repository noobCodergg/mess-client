import React, { useEffect, useState } from "react";
import { getSummery } from "@/Api/mealApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Summery = () => {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const response = await getSummery();
      setSummary(response.data.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading summary...</p>
      </div>
    );
  }

  const { totalBazar, totalMeal, mealRate, userSummaries } = summary;

  return (
    <div className="p-6 space-y-6">
      {/* Overall Summary */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Monthly Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Bazar</p>
            <p className="text-lg font-bold text-gray-800">{totalBazar} ৳</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Meals</p>
            <p className="text-lg font-bold text-gray-800">{totalMeal}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Meal Rate</p>
            <p className="text-lg font-bold text-gray-800">{mealRate.toFixed(2)} ৳</p>
          </div>
        </CardContent>
      </Card>

      {/* Per User Summary Table */}
      <Card className="shadow-md border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            User-wise Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Current Month Meal & Bazar Summary</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Total Meals</TableHead>
                <TableHead className="text-center">Total Bazar (৳)</TableHead>
                <TableHead className="text-center">Meal Cost (৳)</TableHead>
                <TableHead className="text-center">Remaining (৳)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userSummaries.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-center">{user.totalMeal}</TableCell>
                  <TableCell className="text-center">{user.totalBazar} TK</TableCell>
                  <TableCell className="text-center">{user.mealCost.toFixed(2)} TK</TableCell>
                  <TableCell
                    className={`text-center font-semibold ${
                      user.remaining > 0
                        ? "text-green-600"
                        : user.remaining < 0
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {user.remaining.toFixed(2)} TK
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Summery;

