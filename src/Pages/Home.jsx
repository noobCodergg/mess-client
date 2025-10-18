import { getMonthlytotals } from "@/Api/shopApi";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Home = () => {
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const res = await getMonthlytotals();
      setRecords(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {records.length === 0 ? (
        <p>No records found for this month.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {records.map((record) => (
            <Link key={record.userId} to={`/record/${record.userId}`}>
              <Card className="bg-white shadow-md hover:shadow-lg transition w-60 h-40 flex flex-col justify-center items-center">
                <CardContent className="text-center">
                  <h2 className="text-xl font-semibold mb-2">{record.userName}</h2>
                  <p className="mt-2 font-bold text-blue-600 text-lg">
                    Total: {record.total} TK
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
