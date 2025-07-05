import React from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function LifestyleForm({ data, onChange }) {
  const getValue = (id) => data.find((d) => d.id === id)?.value || "";

  return (
    <div className="pt-5 pb-5 space-y-6 max-w-xl w-full mx-auto px-4 sm:px-6">
      <div className="italic mb-2 -ml-42">Your Flow</div>
      <div className="text-left text-[12px]">
        How you live and spend — nothing too deep.
      </div>
      {/* Age Slider */}
      <div>
        <Label>Age</Label>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Slider
            value={[Number(getValue("age"))]}
            min={18}
            max={70}
            step={1}
            onValueChange={(val) => onChange("age", val[0])}
            className="w-full sm:w-[70%]"
          />
          <span className="text-sm">{getValue("age")} years</span>
        </div>
      </div>

      {/* Marital Status Radio Buttons */}
      <div>
        <Label>Marital Status</Label>
        <div className="flex flex-col gap-2 mt-2 sm:flex-row sm:gap-4">
          {["Single", "Married", "Divorced"].map((status) => (
            <label key={status} className="flex items-center gap-2">
              <input
                type="radio"
                name="maritalStatus"
                value={status}
                checked={getValue("maritalStatus") === status}
                onChange={(e) => onChange("maritalStatus", e.target.value)}
              />
              {status}
            </label>
          ))}
        </div>
      </div>

      {/* Location Textarea */}
      <div>
        <Label>Current Location</Label>
        <Textarea
          value={getValue("location")}
          placeholder="City, State, Country"
          onChange={(e) => onChange("location", e.target.value)}
          className="mt-2"
        />
      </div>

      {/* Living Situation Dropdown */}
      <div>
        <Label>Living Situation</Label>
        <Select
          value={getValue("livingSituation")}
          onValueChange={(val) => onChange("livingSituation", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your living situation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Living with Family">
              Living with Family
            </SelectItem>
            <SelectItem value="Rented Accommodation">
              Rented Accommodation
            </SelectItem>
            <SelectItem value="Paying Guest (PG)">Paying Guest (PG)</SelectItem>
            <SelectItem value="Own House">Own House</SelectItem>
            <SelectItem value="Hostel / Company Accommodation">
              Hostel / Company Accommodation
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default LifestyleForm;
