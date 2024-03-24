import React, { useState, useEffect } from 'react';
import './addcategory.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Adminnav from '../Adminhome/Adminnav';
import LoadingIcons from 'react-loading-icons';

const Usersearchresults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch users data from the server
    fetch(`http://localhost:5000/auth/userlog?name=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setUsers(data); // Set fetched users data
        setLoading(false); // Update loading state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message); // Update error state
        setLoading(false); // Update loading state
      });
  };

  const handleSearch = () => {
    fetchData(); // Fetch data based on the search term
  };

  if (loading) {
    return (
      <div>
        <Adminnav />
        <h2>Loading...</h2>
        <div className="loading-animation">
          <LoadingIcons.BallTriangle stroke="green" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Adminnav />
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div>
      <Adminnav />
      <h2 className='gridhi'>User Log</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '6px 10px', 
            width: '200px', 
            border: '1px solid #ccc', 
            borderRadius: '20px', 
            outline: 'none' 
          }}
          placeholder="Search Users"
        />
        <button
          onClick={handleSearch} // Call handleSearch when the button is clicked
          style={{ 
            padding: '6px 10px', 
            backgroundColor: '#007bff', // Blue color
            color: 'white', 
            border: '1px solid #007bff', // Blue color
            borderRadius: '0 20px 20px 0', 
            cursor: 'pointer', 
            outline: 'none' 
          }}
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className='load'>Loading...</div>
      ) : (
        <TableContainer component={Paper} className='table'>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className='tableCell'>User ID</TableCell>
                <TableCell className='tableCell'>Name</TableCell>
                <TableCell className='tableCell'>Email</TableCell>
                <TableCell className='tableCell'>Address</TableCell>
                <TableCell className='tableCell'>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(users) && users.map((user) => (
                <TableRow key={user._id}> {/* Add key prop */}
                  <TableCell className='tableCell'> {user._id}</TableCell>
                  <TableCell className='tableCell'>{user.name}</TableCell>
                  <TableCell className='tableCell'>{user.email}</TableCell>
                  <TableCell className='tableCell'>{user.address}</TableCell>
                  <TableCell className='tableCell'>{user.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Usersearchresults;
