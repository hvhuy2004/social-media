import { ErrorMessage, Formik, Field, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField"; // bạn cần import thêm dòng này nếu dùng MUI
import { padding } from "@mui/system";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { email: "", password: "" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

const Login = () => {
  const [formValue, setFormValue] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("handle submit", values);
    dispatch(loginUserAction({data: values}));
  };

return (
  <>
    <Formik
      onSubmit={handleSubmit}
      //validationSchema={validationSchema}
      initialValues={initialValues}
    >
      <Form className="space-y-5">
        <div className="space-y-5">
          <div>
            <Field
              as={TextField}
              name="email"
              type="email"
              placeholder="Email"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="email"
              component={"div"}
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <Field
              as={TextField}
              name="password"
              type="password"
              placeholder="Password"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="password"
              component={"div"}
              className="text-red-500 text-sm"
            />
          </div>
        </div>
        <Button sx={{padding: ".8rem 0rem"}} fullWidth type="submit" variant="contained" color="primary">Login</Button>
      </Form>
    </Formik>
    
    <div>
      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <Button onClick={() => navigate("/register")}>Register</Button>
      </p>
    </div>
  </>
);
};

export default Login;
