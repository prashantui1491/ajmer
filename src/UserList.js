
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const UserList = () => {
  const initialValue = {
    avatar: '',
    id: '',
    first_name: '',
    email: '',
  };

  const initivaValidation = {
    id:{
        error:false,
        errorMessage:'You must enter a Id'
      },
    first_name:{
      error:false,
      errorMessage:'You must enter a name'
    },
    email:{
      error:false,
      errorMessage:'You must enter an email'
    }
  }
  const [data, setData] = useState([]);
  const [values, setValues] = useState(initialValue);
  const [userinfo, setUserinfo] = useState([]);
  const [theme, setTheme] = useState(false);
  const [loading, setLoading] = useState(false)
 
  const [validations,setValidations] = useState(initivaValidation)
  const fetchApiData = () => {
    setLoading(true)
    fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((json) => setData(json?.data));
      setLoading(false)
  };

  const postAPI = async(url = '', data = {}) =>{
    setLoading(true)
  const response = await fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(values)
  })
  setLoading(false)
  return response.json()
  }

  useEffect(() => {
    fetchApiData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.files) {
      setValues({
        ...values,
        [name]: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const adduserInfo = () => {
   
    const formFields = Object.keys(validations);
    let error = false;
    let validationsCopy = {...validations}
    for(let i =0 ;i<formFields.length;i++){
        const currentField = formFields[i];
      const currentValue = values[currentField];
      if(currentValue === ""){
        error = true;
        validationsCopy = {
            ...validationsCopy,
            [currentField]:{
                ...validationsCopy[currentField],
                error:true
            }
        }
      }

    }
    setValidations(validationsCopy)
    if(!error){
        error = false
        setUserinfo([...data, values]);
        setData([...data, values]);
        setValues(initialValue);
        setValidations(initivaValidation)
        postAPI("https://reqres.in/api/users",values).then(res=>console.log(res))
    }
 
  };

  //console.log(data);
  const themeHandler = () => {
    setTheme(!theme);
  };
  return (
    <div style={{backgroundColor: theme ? "pink" : "white"}}>
        <Box mt={2}>
        <Box mt={2} sx={{display:"flex", justifyContent:"center"}}>
        <TextField
          id="standard-basic"
          label="Enter Id"
          variant="outlined"
          type="number"
          name="id"
          value={values.id}
          onChange={handleChange}
          error={validations?.id?.error}
          helperText={validations?.id?.error && validations?.id?.errorMessage}
          required
        />
        <TextField
          id="standard-basic"
          label="Enter Name"
          variant="outlined"
          type="text"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
          required
          error={validations?.first_name?.error}
          helperText={validations?.first_name?.error && validations?.first_name?.errorMessage}
        />

        <TextField
          id="standard-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          labelId="email"
          value={values.email}
          onChange={handleChange}
          required
          error={validations?.email?.error} 
          helperText={validations?.email?.error && validations?.email?.errorMessage}       
          />
        <TextField
          type="file"
          name="avatar"
          onChange={handleChange}
          style = {{width: "250px"}}
        />

  </Box>
  <Box mt={2}>


        <Button variant="contained" onClick={adduserInfo}>
          Submit
        </Button>
        <Button variant="contained" onClick={themeHandler}>
          Theme Swap
        </Button>
        </Box>
        </Box>
        
        <TableContainer component={Paper} style={{width:"60%", margin:"0 auto", marginTop:"20px"}} >
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? <CircularProgress style={{marginLeft:"350px"}}/> : data.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">
                    <img src={user?.avatar} alt={user?.first_name} style = {{width:"50px", height:"50px", borderRadius:"50%"}} />
                  </TableCell>
                  <TableCell align="center">{user?.id}</TableCell>
                  <TableCell align="center">{user?.first_name}</TableCell>
                  <TableCell align="center">{user?.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};
export default UserList;
