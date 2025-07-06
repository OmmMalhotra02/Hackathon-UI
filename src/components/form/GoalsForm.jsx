import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";

function GoalsForm({ data, onChange }) {
  const getValue = (id) => data.find((d) => d.id === id)?.value || "";

  const handleCheckboxChange = (id, option) => {
    let current = getValue(id);
    if (!Array.isArray(current)) current = [];

    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];

    onChange(id, updated);
  };

  return (
    <div className="pt-5 pb-5 space-y-6 max-w-xl w-full mx-auto px-4 sm:px-6">
      <div className="italic mb-2 -ml-32 sm:flex sm:ml-0">Looking Ahead</div>
      <div className="text-left text-[12px]">
        What you're aiming for, in your own way.
      </div>
      <div>
        <Label>Investment Instruments Used</Label>
        <div className="flex flex-col gap-2 mt-2">
          {["mutual-funds", "stocks", "real-estate"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <Checkbox
                checked={getValue("investmentInstruments")?.includes(item)}
                onCheckedChange={() =>
                  handleCheckboxChange("investmentInstruments", item)
                }
              />
              {item
                .split("-")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </label>
          ))}
        </div>
      </div>

      <div>
        <Label>Experience with Investing</Label>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Slider
            value={[parseInt(getValue("experience")) || 0]}
            min={0}
            max={10}
            step={1}
            onValueChange={(val) => onChange("experience", val[0])}
            className="w-full sm:w-[70%]"
          />
          <span className="text-sm">{getValue("experience") || 0} / 10</span>
        </div>
      </div>

      <div>
        <Label>Financial Goals</Label>
        <Textarea
          placeholder="e.g. Retirement by 55, buying a house in 5 years..."
          value={getValue("financialGoals")}
          onChange={(e) => onChange("financialGoals", e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Preferred Investment Duration (Years)</Label>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Slider
            value={[parseInt(getValue("investmentDuration")) || 5]}
            min={1}
            max={30}
            step={1}
            onValueChange={(val) => onChange("investmentDuration", val[0])}
            className="w-full sm:w-[70%]"
          />
          <span className="text-sm">
            {getValue("investmentDuration") || 5} years
          </span>
        </div>
      </div>
    </div>
  );
}

export default GoalsForm;
