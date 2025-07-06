import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

function ProfessionForm({ data, onChange }) {
  const getValue = (id) => {
    if (!data) return "";
    const field = data.find((f) => f.id === id);
    return field?.value || "";
  };

  return (
    <div className="pt-5 pb-5 space-y-6 w-full max-w-xl mx-auto px-4 sm:px-6">
      <div className="italic mb-2 -ml-38 sm:flex sm:ml-0">Work & You</div>
      <div className="text-left text-[12px]">
        A peek at your path — helps us guide better.
      </div>
      {/* Employment Type */}
      <div>
        <Label className="mb-3">Employment Type</Label>
        <RadioGroup
          value={getValue("employmentType")}
          onValueChange={(val) => onChange("employmentType", val)}
          className="flex flex-col gap-2 sm:flex-row sm:gap-6"
        >
          <label className="flex items-center gap-2">
            <RadioGroupItem value="salaried" id="salaried" />
            Salaried
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem value="self-employed" id="self-employed" />
            Self-Employed
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem value="freelancer" id="freelancer" />
            Freelancer
          </label>
        </RadioGroup>
      </div>

      {/* Industry */}
      <div>
        <Label className="mb-3">Industry</Label>
        <Select
          value={getValue("industry")}
          onValueChange={(val) => onChange("industry", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="education">Education</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Location */}
      <div>
        <Label className="mb-3">Job Location</Label>
        <Input
          type="text"
          value={getValue("jobLocation")}
          onChange={(e) => onChange("jobLocation", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Monthly Income */}
      <div>
        <Label className="mb-3">Monthly Income ($)</Label>
        <Input
          type="number"
          value={getValue("monthlyIncome")}
          onChange={(e) => onChange("monthlyIncome", e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default ProfessionForm;
