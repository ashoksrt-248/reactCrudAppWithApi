import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@mui/material"
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "../pages/Home.css";

const List = () => {
 
 const [students, setStudents] = useState([]);

 useEffect(() => {
  async function getAllStudent() {
   try {
    const students = await axios.get("http://localhost:3001/students")
    // console.log(students.data);
    setStudents(students.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllStudent();
 }, [])

 const handleDelete = async id => {
  await axios.delete(`http://localhost:3001/students/${id}`);
  var newstudent = students.filter((item) => {
   // console.log(item);
   return item.id !== id;
  })
  setStudents(newstudent);
 }


 return (
  <>
   <Box textAlign="center" p={2}  className='studentList' >
    <Typography variant="h4">Student List</Typography>
   </Box>
   <TableContainer component={Paper}>
    <Table>
     <TableHead>
      <TableRow style={{ backgroundColor: "#FFFF8F" }}>
       <TableCell align="center" >No</TableCell>
       <TableCell align="center" >Name</TableCell>
       <TableCell align="center" >Email</TableCell>
       <TableCell align="center" >Action</TableCell>
      </TableRow>
     </TableHead>
     <TableBody>
      {
       students.map((student, i) => {
        return (
         <TableRow key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <TableCell align="center">{student.stuname}</TableCell>
          <TableCell align="center">{student.email}</TableCell>
          <TableCell align="center">
           <Tooltip title="View">
            <IconButton><Link to={`/view/${student.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${student.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(student.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </TableRow>
        )
       })
      }

     </TableBody>
    </Table>
   </TableContainer>
  </>
 )
}

export default List





