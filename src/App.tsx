import React from "react";
import "./App.css";
import { Field, ErrorMessage } from "formik";
import { TextField, Card, CardContent } from "@material-ui/core";
import { FormikStepper, FormikStep } from "./FormikStepper/FormikStepper";
import * as Yup from "yup";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

function App() {
  return (
    <div className="wrapper">
      <nav>
        <Card>
          <CardContent></CardContent>
        </Card>
      </nav>
      <Card className="form-card">
        <CardContent>
          <FormikStepper
            initialValues={{
              firstName: "",
              lastName: "",
              fatherName: "",
              age: 0,
              address: "",
              school: "",
              college: "",
              university: "",
              mobileNumber: 0,
              email: "",
              postalCode: "",
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              console.log("Values >>", values);
            }}
          >
            <FormikStep
              label="Personal info"
              validationSchema={Yup.object({
                // firstName: Yup.string().required("Required !"),
                // lastName: Yup.string().required("Required !"),
              })}
            >
              <Field
                name="firstName"
                component={TextField}
                label="First Name"
                className="field"
              />
              <ErrorMessage name="firstName" />
              <Field
                className="field"
                name="lastName"
                component={TextField}
                label="Last Name"
              />
              <ErrorMessage name="lastName" />
              <Field
                className="field"
                name="fatherName"
                component={TextField}
                label="Father Name"
              />
              <ErrorMessage name="fatherName" />
              <Field
                className="field"
                name="age"
                type="number"
                component={TextField}
                label="Age"
              />
              <ErrorMessage name="age" />
              <Field
                className="field"
                fullWidth
                name="address"
                component={TextField}
                label="Address"
              />
              <ErrorMessage name="address" />
            </FormikStep>
            <FormikStep label="Education Info">
              <Field
                className="field"
                fullWidth
                name="school"
                component={TextField}
                label="School Name"
              />
              <ErrorMessage name="school" />
              <Field
                className="field"
                fullWidth
                name="college"
                component={TextField}
                label="College Name"
              />
              <ErrorMessage name="college" />
              <Field
                className="field"
                fullWidth
                name="university"
                component={TextField}
                label="University Name"
              />
              <ErrorMessage name="university" />
            </FormikStep>
            <FormikStep label="Contact Info">
              <Field
                className="field"
                name="email"
                component={TextField}
                label="Email Address"
              />
              <ErrorMessage name="email" />
              <Field
                className="field"
                type="number"
                name="mobileNumber"
                component={TextField}
                label="Mobile Number"
              />
              <ErrorMessage name="mobileNumber" />
              <Field
                fullWidth
                className="field"
                name="postalCode"
                component={TextField}
                label="Postal Code"
              />
              <ErrorMessage name="postalCode" />
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
