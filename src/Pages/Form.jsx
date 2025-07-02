import React from "react";
import FormWrapper from "../components/form/FormWrapper";

function Form() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        <FormWrapper />
      </div>
    </div>
  );
}

export default Form;
