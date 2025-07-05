import React, { useState, useEffect } from "react";
import FinanceForm from "./FinanceForm";
import GoalsForm from "./GoalsForm";
import LifestyleForm from "./LifestyleForm";
import ProfessionForm from "./ProfessionForm";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const initialForm = [
  {
    section: 1,
    label: "financialInformation",
    sectionObject: [
      {
        id: "yearlySavings",
        name: "yearlySavings",
        value: "500000",
      },
      {
        id: "emergencyFund",
        name: "emergencyFund",
        value: "100000",
      },
      {
        id: "dependents",
        name: "dependents",
        value: "2",
      },
      {
        id: "monthlyExpense",
        name: "monthlyExpense",
        value: "40000",
      },
    ],
  },
  {
    section: 2,
    label: "demographicProfile",
    sectionObject: [
      {
        id: "age",
        name: "age",
        value: "30",
      },
      {
        id: "maritalStatus",
        name: "maritalStatus",
        value: "Married",
      },
      {
        id: "location",
        name: "location",
        value: "Mumbai",
      },
      {
        id: "livingSituation",
        name: "livingSituation",
        value: "Living with Family",
      },
    ],
  },
  {
    section: 3,
    label: "employmentIncome",
    sectionObject: [
      {
        id: "employmentType",
        name: "employmentType",
        value: "Salaried",
      },
      {
        id: "industry",
        name: "industry",
        value: "Finance",
      },
      {
        id: "jobLocation",
        name: "jobLocation",
        value: "",
      },
      {
        id: "monthlyIncome",
        name: "monthlyIncome",
        value: "90000",
      },
    ],
  },
  {
    section: 4,
    label: "investmentPreferences",
    sectionObject: [
      {
        id: "investmentInstruments",
        name: "investmentInstruments",
        value: ["mutual-funds", "stocks", "real-estate"],
      },
      {
        id: "experience",
        name: "experience",
        value: 3,
      },
      {
        id: "financialGoals",
        name: "financialGoals",
        value: "Retirement, Education",
      },
      {
        id: "investmentDuration",
        name: "investmentDuration",
        value: 5,
      },
    ],
  },
];

function FormWrapper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const saved = localStorage.getItem("profileForm");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const updateField = (sectionIndex, fieldId, newValue) => {
    const newData = [...formData];
    const field = newData[sectionIndex].sectionObject.find(
      (f) => f.id === fieldId
    );
    if (field) {
      field.value = newValue;
      setFormData(newData);
      localStorage.setItem("profileForm", JSON.stringify(newData));
    }
  };

  const sections = [
    <FinanceForm
      data={formData[0].sectionObject}
      onChange={(id, val) => updateField(0, id, val)}
    />,
    <GoalsForm
      data={formData[3].sectionObject}
      onChange={(id, val) => updateField(3, id, val)}
    />,
    <LifestyleForm
      data={formData[1].sectionObject}
      onChange={(id, val) => updateField(1, id, val)}
    />,
    <ProfessionForm
      data={formData[2].sectionObject}
      onChange={(id, val) => updateField(2, id, val)}
    />,
  ];

  const handleNext = async () => {
    if (step === sections.length - 1) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://127.0.0.1:8000/users/complete-kyc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ form_data: JSON.stringify(formData) }),
        });

        if (!res.ok) {
          const error = await res.json();
          console.error("KYC failed:", error.detail);
          return;
        }

        const result = await res.json();
        console.log("✅ KYC submitted:", result);

        // Save locally and move to chat
        localStorage.setItem("profileForm", JSON.stringify(formData));
        window.location.href = "/chat";
      } catch (error) {
        console.error("❌ Error submitting KYC:", error);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };
  const progress = ((step + 1) / sections.length) * 100;

  return (
    <div className="text-center max-w-3xl mx-auto px-4 sm:px-6">
      <div className="text-lg font-semibold mb-4 -mt-5">
        <div className="text-red-600 text-[22px] -ml-35 font-[800]">
          Pulse Check!
        </div>
        <div className="-ml-12">Your Investment Personality</div>
      </div>
      {/* <p className="text-gray-500 text-sm">
        Step {step + 1} of {sections.length}
      </p> */}
      <Progress value={progress} className="h-3 mb-8" />
      <div className="rounded-2xl shadow-2xl/40">{sections[step]}</div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
        )}
        <Button onClick={handleNext} className="w-full sm:w-auto">
          {step === sections.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
export default FormWrapper;
