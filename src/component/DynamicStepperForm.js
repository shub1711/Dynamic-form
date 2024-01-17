import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@material-ui/core";

import structure from "../data/structure.json";
import validations from "../data/validation.json";

const DynamicStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = structure.steps;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getCurrentStepFields = () => {
    return structure.steps[activeStep].fields;
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form>
        {getCurrentStepFields().map((field) => (
          <div key={field.id}>
            <label>{field.label}</label>
            <input type={field.type} />
            {validations[field.id]?.required && (
              <span style={{ color: "red" }}> *Required</span>
            )}
            {validations[field.id]?.pattern && (
              <span style={{ color: "red" }}> *Invalid {field.label}</span>
            )}
          </div>
        ))}
      </form>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Finish" : "Next"}
      </Button>
    </div>
  );
};

export default DynamicStepperForm;
