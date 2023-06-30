import React from "react";

import { useFormik } from 'formik';
import * as yup from 'yup';

import './index.css';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { FormControl, InputLabel,  MenuItem, TextareaAutosize, Select, RadioGroup, FormControlLabel, Radio, Checkbox } from "@material-ui/core";

import Card from './components/Card';


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
        .required('password is required'),
    address: yup
        .string('Enter your address')
        .required('Address is required'),
    country: yup
        .string('Enter your address!')
        .required('Please Select Your Country!'),
    gender: yup
        .string('Select Your Gender!')
        .required('Pleae Select Your Gender!'),
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
        validationSchema: validationSchema,
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
                    helperText={ formik.touched.username && formik.errors.username }
                    />
            
                <br />
                <br />

                <InputLabel htmlFor="address">Address</InputLabel>
                <TextareaAutosize
                    id="address"
                    name="address"
                    minRows={2}
                    label="address"
                    value={formik.values.address}
                    onChange={formik.handleChange} 
                    error={ formik.touched.address && Boolean(formik.errors.address) } />
                
                <p>{ formik.touched.address && <span className="span-error"> {formik.errors.address} </span>  }</p>
            
               
                
                <FormControl fullWidth >
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Select 
                        id="country"
                        name="country"
                        label="Country"
                        variant="outlined"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={ formik.touched.country && Boolean(formik.errors.country) }>
                            {countries.map( (option) => (
                                <MenuItem key={option.value} value={option.value} >
                                    {option.label}
                                </MenuItem>
                            ) )}
                    </Select>
                </FormControl>
                <p> { formik.touched.country && <span className="span-error">{formik.errors.country}</span> } </p>

                
                <FormControl fullWidth component="fieldset" margin="normal">
                <InputLabel htmlFor="gender">Gender</InputLabel>
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
                <p> { formik.touched.gender && formik.errors.gender && <span className="span-error">Please Select Your Gender</span> } </p> 


                   
                    <FormControl
                        variant="outlined" 
                        fullWidth 
                        margin="normal"
                        error={ formik.touched.intrest &&  formik.values.intrest.length === 0 } >
                        <InputLabel htmlFor="intrest">Interests</InputLabel>
                        <Select 
                            id="intrest"
                            name="intrest" 
                            value={formik.values.intrest}
                            multiple
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
              
                <p> { formik.touched.intrest &&  formik.values.intrest.length === 0 && <span className="span-error">Please Select Your Interest</span> } </p>

                <Button color="primary" variant="contained" type="submit">
                    Submit
                </Button>

            </form> 
        </Card>

    );

    



};

export default App;