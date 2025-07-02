import React from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";

function FinanceForm({ data, onChange }) {
  const getValue = (id) => {
    const found = data.find((d) => d.id === id);
    return found ? found.value || 0 : 0;
  };

  const handleSliderChange = (id, val) => {
    onChange(id, val[0]); // Slider gives an array
  };

  const handleInputChange = (id, e) => {
    onChange(id, parseInt(e.target.value) || 0);
  };

  return (
    <div className="w-full px-4 md:px-0 max-w-3xl mx-auto space-y-8">
      {/* Field Group Template */}
      {[
        {
          id: "yearlySavings",
          label: "Estimated Yearly Savings ($)",
          max: 2000000,
          step: 10000,
        },
        {
          id: "emergencyFund",
          label: "Emergency Fund Available ($)",
          max: 1000000,
          step: 5000,
        },
        {
          id: "dependents",
          label: "Number of Dependents",
          max: 10,
          step: 1,
        },
        {
          id: "monthlyExpense",
          label: "Monthly Expenditure ($)",
          max: 100000,
          step: 1000,
        },
      ].map(({ id, label, max, step }) => (
        <div key={id} className="space-y-2">
          <Label htmlFor={id}>{label}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <Slider
              id={id}
              value={[getValue(id)]}
              max={max}
              step={step}
              onValueChange={(val) => handleSliderChange(id, val)}
            />
            <Input
              type="number"
              value={getValue(id)}
              onChange={(e) => handleInputChange(id, e)}
              className="w-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FinanceForm;
