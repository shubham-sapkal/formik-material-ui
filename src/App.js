import React from "react";

import { useFormik } from 'formik';
import * as yup from 'yup';

import './index.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { FormControl, InputLabel, MenuItem, TextareaAutosize, Select, RadioGroup, FormControlLabel, Radio, Checkbox } from "@material-ui/core";

import Card from './components/Card';

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';


const countries = [
    { value: 'usa', label: 'United States'},
    { value: 'canada', label: 'Canada'},
    { value: 'uk', label: 'United Kindgom' },
    { value: 'india', label: 'India'}
];

const intrest = [
    { value: 'android', label: 'Android App Development'},
    { value: 'fullstack', label: 'Full Stack Web Development'},
    { value: 'crossplatform', label: 'Cross Platform Development'},
    { value: 'datascience', label: 'Data Science'}
]


const validationSchema = yup.object({
    username: yup
        .string('Enter Your Username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('password is required')
});


const App = () => {
    
    const formik = useFormik({
        initialValues: {
            username: '',
            address: '',
            country: '',
            gender: '',
            intrest: [],
        },
        onSubmit: (values) => {
            console.log("Form Submitted!");
            console.log(JSON.stringify(values));
        }
    })
    
    return (
        <Card className="card-style" >
            <h1>Registration Form</h1>

            <form onSubmit={formik.handleSubmit} >
                <TextField 
                    id="username"
                    name="username"
                    label="username"
                    fullWidth
                    variant="outlined"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={ formik.touched.username && Boolean(formik.errors.username) } 
                    helperText={ formik.touched.username && formik.errors.username }/>
            
                <br />
                <br />

                <InputLabel htmlFor="address">Address</InputLabel>
                <TextareaAutosize
                    id="address"
                    name="address"
                    minRows={3}
                    label="address"
                    value={formik.values.address}
                    onChange={formik.handleChange} />
                
                <br />
                <br />

                <FormControl  fullWidth margin="normal">
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Select 
                        id="country"
                        name="country"
                        variant="outlined"
                        value={formik.values.country}
                        onChange={formik.handleChange} >
                            {countries.map( (option) => (
                                <MenuItem key={option.value} value={option.value} >
                                    {option.label}
                                </MenuItem>
                            ) )}
                    </Select>
                </FormControl>

                <FormControl fullWidth component="fieldset" margin="normal">
                    <RadioGroup 
                        id="gender"
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange} >
                            <FormControlLabel 
                                value="male"
                                control={<Radio />}
                                label="Male" />
                            <FormControlLabel 
                                value="female"
                                control={<Radio />}
                                label="Female" />
                    </RadioGroup>
                </FormControl>

                <FormControl variant="outlined" fullWidth margin="normal">
                    <InputLabel htmlFor="intrest">Interests</InputLabel>
                    <Select 
                        id="intrest"
                        name="intrest"
                        multiple
                        value={formik.values.intrest}
                        onChange={formik.handleChange}
                        renderValue={ (selected) => selected.join(', ') } >
                            { intrest.map( option => (
                                <MenuItem key={option.value} value={option.value} >
                                    <Checkbox checked={formik.values.intrest.includes(option.value)} />
                                    {option.label}
                                </MenuItem>
                            ) ) }
                    </Select>
                </FormControl>

                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>

            </form> 
        </Card>

    );
};

export default App;