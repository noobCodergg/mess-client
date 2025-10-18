import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserContext } from "@/Context/UserContext";
import { getRecordByUser } from "@/Api/shopApi";
import { useParams } from "react-router-dom";

const MyRecord = () => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const {userId} = useParams();
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  };

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await getRecordByUser(userId, selectedMonth);
        const entries = res.data.data;

        const flattened = [];
        entries.forEach((doc) => {
          doc.entries.forEach((item) => {
            flattened.push({
              sl: flattened.length + 1,
              item: item.name,
              price: item.price,
              quantity: item.quantity,
              date: doc.date,
            });
          });
        });

        setData(flattened);
        setTotalPrice(res.data.totalPrice || 0);
      } catch (error) {
        console.error("Error fetching shop entries:", error);
      }
    };

    fetchData();
  }, [userId, selectedMonth]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6">
        {/* Card */}
        <Card className="w-full md:w-60">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Summary</h3>
            <p>Total Items: {data.length}</p>
            <p>Total Price: {totalPrice} TK</p>
          </CardContent>
        </Card>

        {/* Month dropdown */}
        <div className="w-full md:w-40 mt-2 md:mt-0 md:ml-auto">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-gray-300">
          <TableHeader>
            <TableRow className="border-b border-gray-300">
              <TableHead className="text-left w-12">SL</TableHead>
              <TableHead className="text-left w-40">Item</TableHead>
              <TableHead className="text-left w-24">Price</TableHead>
              <TableHead className="text-left w-24">Quantity</TableHead>
              <TableHead className="text-left w-40">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.sl} className="border-b border-gray-200">
                <TableCell className="text-left">{row.sl}</TableCell>
                <TableCell className="text-left">{row.item}</TableCell>
                <TableCell className="text-left">{row.price} TK</TableCell>
                <TableCell className="text-left">{row.quantity} kg</TableCell>
                <TableCell className="text-left">{formatDate(row.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyRecord;
