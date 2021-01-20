import React, { Children, useState } from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  CircularProgress,
} from "@material-ui/core";
import "./FormikStepper.css";
import { FormikStepProps } from "./Formik.interface";

export function FormikStep({ children, ...props }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  console.log(currentChild);

  const isLastStep = () => {
    return step === childrenArray.length - 1;
  };

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
          // helpers.resetForm();
          // setStep(0);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper className="stepper" activeStep={step} orientation="vertical">
            {childrenArray.map((child, index) => (
              <Step
                className="step"
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
                <StepContent>
                  {currentChild}{" "}
                  {step > 0 ? (
                    <Button
                      className="button"
                      disabled={isSubmitting}
                      onClick={() => setStep((s) => s - 1)}
                    >
                      Back
                    </Button>
                  ) : null}
                  <Button
                    className="button"
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting
                      ? "Submitting"
                      : isLastStep()
                      ? "Submit"
                      : "Next"}
                  </Button>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Form>
      )}
    </Formik>
  );
}
