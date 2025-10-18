import React, { useContext, useState } from "react";
import { UserContext } from "@/Context/UserContext";
import { Button } from "@/components/ui/button";
import { addToShop } from "@/api/shopApi";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ShopEntry = () => {
  const { userId } = useContext(UserContext);

  const [entries, setEntries] = useState([{ name: "", price: "", quantity: "" }]);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { name: "", price: "", quantity: "" }]);
  };

  const handleRemoveEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleSaveAll = async () => {
    try {
      const formattedEntries = entries.map((e) => ({
        name: e.name,
        price: Number(e.price),
        quantity: Number(e.quantity),
      }));

      await addToShop({ userId, entries: formattedEntries });
      alert("✅ Entries saved successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save entries!");
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">🛒 Shop Entries</h2>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <Card key={index} className="shadow-sm border border-gray-200">
            <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              <Input
                placeholder="Item Name"
                value={entry.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Price"
                value={entry.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={entry.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() => handleRemoveEntry(index)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={handleAddEntry} className="flex items-center justify-center gap-1">
          ➕ Add New
        </Button>
        <Button variant="secondary" onClick={handleSaveAll} className="flex items-center justify-center gap-1">
          💾 Save All
        </Button>
      </div>
    </div>
  );
};

export default ShopEntry;
