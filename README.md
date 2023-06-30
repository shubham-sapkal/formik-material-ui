
# Formik Material UI


# What is Formik

Formik is a popular open-source library for building and processing form data in React applications. It provides many utility components and functions that make handling form data in a React application more enjoyable.

Traditional form-management method in React requires creating a universal or single useState() hook for each form field, adding an event listener to each field, and triggering a method to update them individually.

```
// Infuriating traditional react form management method

import { useState } from "react";

function InputForm() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "input1") {
      setInput1(value);
    } else if (name === "input2") {
      setInput2(value);
    }
  };

  const handleSubmit = (event) => {
   // . . .
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="input1" value={input1} onChange={handleInputChange} />
      <input name="input2" value={input2} onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;
```

On the other hand, Formik handles all of these tedious operations for us under the hood. We only need to import its provided components – our form data are readily available.

In addition to helping us handle form data, Formik provides some other mechanisms that let us validate form fields, track form submission state, and handle errors.

```
<Formik
  onSubmit={(formData) => {
    console.log(formData);
  }}
>
  {({ isSubmitting }) => (
    <Form>
      <Field type="text" name="fullname" placeholder="Enter fullname" />
      <Field type="email" name="email" placeholder="Enter address" />
      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>;
```

Another Example using useFormik() Hook

```
import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
  // Note that we have to initialize ALL of fields with values. These
  // could come from props, but since we don’t want to prefill this form,
  // we just use an empty string. If we don’t do this, React will yell
  // at us.
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type="submit">Submit</button>
    </form>
  );
};
```

# Formik With Material UI


Formik can be easily used/integrated with Material UI, with just passing a few formik props to the respective Material UI Component props. Refer to the example below to get started.


```
import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const WithMaterialUI = () => {
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

ReactDOM.render(<WithMaterialUI />, document.getElementById('root'));
```

# installation

formik - for form
```
npm install formik
```

yup - for validation
```
npm install yup
```

material-ui - for desigining
```
npm install @material-ui/core
```



# API Reference

Formik : https://formik.org/docs/overview

Material UI v4: https://v4.mui.com/getting-started/installation/