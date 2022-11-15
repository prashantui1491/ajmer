// import React, { useState, useEffect } from 'react'
// import styles from './style.css'

// const UserList = () => {

//     const initialValue = {
//         avatar: '',
//         id : '',
//         first_name: '',
//         email: ''
//     }

//     const [data, setData] = useState([])
//     const [values, setValues] = useState(initialValue)
//     const [userinfo, setUserinfo] = useState([])
//     const [color, setColor] = useState(false)

//     const fetchApiData = () => {
//         fetch('https://reqres.in/api/users')
//             .then((response) => response.json())
//             .then((json) => setData(json?.data))
//     }

//     useEffect(() => {
//         fetchApiData();
//     }, [])

//     const handleChange = (e) => {
//         const {name,value} = e.target
//         debugger
//         if(e.target.files){
//             setValues({
//                 ...values,
//                 [name]:URL.createObjectURL(e.target.files[0])
//             })
//         }
//         else{
//             setValues(
//                 {
//                     ...values,
//                     [name]:value
//                 }
//             )
//         }
        
//     }

//     const adduserInfo = () => {
//         setUserinfo([...data, values])
//         setData([...data,values])
//         setValues(initialValue)
//     }

//     console.log(data)
//     const colorHandler = () => {
//         setColor(!color)
//     }
//     return (
//         <div className={styles.customers}
//         style={{backgroundColor: color ? "black" : "white"}}>
//             <input type= "file" name="avatar"  onChange={handleChange} />
//             <input placeholder="Enter Id" type="number" name="id" value={values.id} onChange={handleChange} />
//             <input placeholder='Enter Name' type="text" name = "first_name" value = {values.first_name} onChange = {handleChange}/>
//             <input placeholder='Enter mail' type="email" name="email" value={values.email} onChange = {handleChange}/>
//             <button onClick = {adduserInfo} >Submit</button>
//             <button onClick = {colorHandler}>Color Swap</button>
//             <table style={{border:color?"black":"white"}}>
//                 <thead>
//                     <tr>
//                         <th style={{color: color ? "white" : "black"}}>Image</th>
//                         <th style={{color: color ? "white" : "black"}}>Id</th>
//                         <th style={{color: color ? "white" : "black"}}>Name</th>
//                         <th style={{color: color ? "white" : "black"}}>Email</th>
//                     </tr>
//                 </thead>
//                 <tbody >

//                     {
//                         data?.map((user) => {
//                             return (
//                                 <tr key = {user.id} style={{color: color ? "white" : "black"}}>
//                                     <td style={{color: color ? "white" : "black"}}><img src={user?.avatar} alt={user?.first_name} /></td>
//                                     <td>{user?.id}</td>
//                                     <td>{user?.first_name}</td>
//                                     <td>{user?.email}</td>
//                                 </tr>
//                             )
//                         })
//                     }

//                 </tbody>
//             </table>

//         </div>
//     )
// }

// export default UserList

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

const UserList = () => {
  const initialValue = {
    avatar: '',
    id: '',
    first_name: '',
    email: '',
  };

  const [data, setData] = useState([]);
  const [values, setValues] = useState(initialValue);
  const [userinfo, setUserinfo] = useState([]);
  const [color, setColor] = useState(false);

  const fetchApiData = () => {
    fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((json) => setData(json?.data));
  };

  const postAPI = async(url = '', data = {}) =>{
  const response = await fetch(url,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(values)
  })
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
    setUserinfo([...data, values]);
    setData([...data, values]);
    setValues(initialValue);
    postAPI("https://reqres.in/api/users",values).then(res=>console.log(res))
  };

  console.log(data);
  const colorHandler = () => {
    setColor(!color);
  };
  return (
    <div>
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
        />
        <TextField
          id="standard-basic"
          label="Enter Name"
          variant="outlined"
          type="text"
          name="first_name"
          value={values.first_name}
          onChange={handleChange}
        />

        <TextField
          id="standard-basic"
          label="Enter Email"
          variant="outlined"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
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
        <Button variant="contained" onClick={colorHandler}>
          Color Swap
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
              {data.map((user) => (
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
