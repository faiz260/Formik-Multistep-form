import React, { Children, useState } from "react";
import "./App.css";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FormikConfig,
  FormikValues,
} from "formik";
import { Button, TextField } from "@material-ui/core";
import * as Yup from "yup";

function App() {
  return (
    <FormikStepper
      initialValues={{
        firstName: "",
        lastName: "",
        school: "",
        email: "",
      }}
      onSubmit={() => {}}
    >
      <FormikStep
        // validationSchema={Yup.object({
        //   firstName: Yup.string().required("Required !"),
        //   lastName: Yup.string().required("Required !"),
        // })}
      >
        <Field name="firstName" component={TextField} label="firstName" />
        <ErrorMessage name="firstName" />
        <Field name="lastName" component={TextField} label="lastName" />
        <ErrorMessage name="lastName" />
      </FormikStep>
      <FormikStep>
        <Field name="school" component={TextField} label="school" />
        <ErrorMessage name="school" />
      </FormikStep>
      <FormikStep>
        <Field name="email" component={TextField} label="email" />
        <ErrorMessage name="email" />
      </FormikStep>
    </FormikStepper>
  );
}

export default App;

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {}

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
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      <Form autoComplete="off">
        {currentChild}{" "}
        {step > 0 ? (
          <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
        ) : null}
        <Button type="submit">{isLastStep() ? "Submit" : "Next"}</Button>
      </Form>
    </Formik>
  );
}
