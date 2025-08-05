import { ErrorMessage, Formik, Field, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';  
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";

const initialValues = { firstName: "", lastName: "", email: "", password: "", gender: "female" };

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

const Register = () => {
  const [gender, setGender] = useState("female");

   const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleSubmit = (values) => {
    values.gender = gender;
    console.log("handle submit", values);
    dispatch(registerUserAction({data: values}));
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            {/* First Name */}
            <Field
              as={TextField}
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
            />

            {/* Last Name */}
            <Field
              as={TextField}
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
            />

            {/* Email */}
            <Field
              as={TextField}
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* Password */}
            <Field
              as={TextField}
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            {/* Gender - All in one row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 2 }}>
              <FormLabel component="legend">
                Gender:
              </FormLabel>
              <RadioGroup 
                onChange={handleChange}
                value={gender}
                name="gender"
                row
              >
                <FormControlLabel 
                  value="female" 
                  control={<Radio />} 
                  label="Female" 
                />
                <FormControlLabel 
                  value="male" 
                  control={<Radio />} 
                  label="Male" 
                />
              </RadioGroup>
            </Box>

            {/* Submit Button */}
            <Button 
              fullWidth 
              type="submit" 
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
            >
              Register
            </Button>

          </Box>
        </Form>
      </Formik>
      
    <div>
      <p className="text-center text-sm mt-4">
       Already have an account?{" "}
        <Button onClick={() => navigate("/login")}>Login</Button>
      </p>
    </div>
    </>
  );
};

export default Register;