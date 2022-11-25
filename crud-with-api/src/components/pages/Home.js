import React from 'react';
// import {  makeStyles, Grid, TextField, Button } from "@material-ui/core";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Home.css";
import Grid from '@mui/material/Grid';
import axios from "axios";
import { useState } from "react";
import List from "../student/List";
const Home = () => {
    // const classes = useStyles();
    const [student, setStudent] = useState({
        stuname: "",
        email: ""
       });
       const [status, setStatus] = useState();
      
    function onTextFieldChange(e) {
        setStudent({
         ...student,
         [e.target.name]: e.target.value
        })
       }
      
       async function onFormSubmit(e) {
        e.preventDefault()
        try {
         await axios.post(`http://localhost:3001/students`, student)
         setStatus(true);
        } catch (error) {
         console.log("Something is Wrong");
        }
       }
       if (status) {
        return <Home />
       }
  return (
    <>
        
        <Box textAlign="center" className='box' p={2}>
            <Typography variant='h4'>React Crud App with APi Call</Typography>
        </Box>
        <Grid container justify="center" spacing={4}>
            
            <Grid item md={6} xs={12}>
                
                <Box textAlign="center" p={2}  mb={2} className='addStudent'>
                    <Typography variant="h4">Add Student</Typography>
                </Box>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoComplete="stuname" name="stuname" variant="outlined" required fullWidth id="stuname" label="Name" onChange={e => onTextFieldChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="email" name="email" variant="outlined" required fullWidth id="email" label="Email Address" onChange={e => onTextFieldChange(e)} />
                        </Grid>
                    </Grid>
                    <Box m={3}>
                        <Button type="submit" variant="contained" color="success" fullWidth onClick={e => onFormSubmit(e)}>Add</Button>
                    </Box>
                </form>
            </Grid>
            <Grid item md={6} xs={12}>
                <List  />
            </Grid>
        </Grid>
    
    </>
  )
}

export default Home