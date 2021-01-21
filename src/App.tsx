import React from "react";
import "./App.css";
import { Field} from "formik";
import { Card, CardContent, Typography } from "@material-ui/core";
import { FormikStepper, FormikStep } from "./FormikStepper/FormikStepper";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

function App() {
  return (
    <div className="wrapper">
      <nav>
        <Card className="nav-card">
          <CardContent>
            <Typography className="heading" variant="h3">
              <span> Multistep </span>
              <span> Form </span>
            </Typography>
          </CardContent>
        </Card>
      </nav>
      <Card className="form-card">
        <CardContent>
          <FormikStepper
            initialValues={{
              firstName: "",
              lastName: "",
              fatherName: "",
              age: "",
              address: "",
              school: "",
              college: "",
              university: "",
              mobileNumber: "",
              email: "",
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              console.log("Values >>", values);
            }}
          >
            <FormikStep
              label="Personal info"
              validationSchema={Yup.object({
                firstName: Yup.string().required("Required !"),
                lastName: Yup.string().required("Required !"),
                fatherName: Yup.string().required("Required !"),
                age: Yup.string().required("Required !"),
                address: Yup.string().required("Required !"),
              })}
            >
              <Field
                name="firstName"
                component={TextField}
                label="First Name"
                className="field"
              />
              <Field
                className="field"
                name="lastName"
                component={TextField}
                label="Last Name"
              />
              <Field
                className="field"
                name="fatherName"
                component={TextField}
                label="Father Name"
              />
              <Field
                className="field"
                name="age"
                component={TextField}
                label="Age"
              />
              <Field
                className="field"
                fullWidth
                name="address"
                component={TextField}
                label="Address"
              />
            </FormikStep>
            <FormikStep
              label="Education Info"
              validationSchema={Yup.object({
                school: Yup.string().required("Required !"),
                college: Yup.string().required("Required !"),
                university: Yup.string().required("Required !"),
              })}
            >
              <Field
                className="field"
                fullWidth
                name="school"
                component={TextField}
                label="School Name"
              />
              <Field
                className="field"
                fullWidth
                name="college"
                component={TextField}
                label="College Name"
              />
              <Field
                className="field"
                fullWidth
                name="university"
                component={TextField}
                label="University Name"
              />
            </FormikStep>
            <FormikStep
              label="Contact Info"
              validationSchema={Yup.object({
                email: Yup.string().email().required("Required !"),
                mobileNumber: Yup.string().required("Required !"),
              })}
            >
              <Field
                className="field"
                name="email"
                type="email"
                component={TextField}
                label="Email Address"
              />
              <Field
                className="field"
                name="mobileNumber"
                component={TextField}
                label="Mobile Number"
              />
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
      <footer>
        <Typography className="footer" variant="h6">
          Made by Faiz Shahnawaz
        </Typography>
      </footer>
    </div>
  );
}

export default App;
