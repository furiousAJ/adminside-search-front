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
import SearchIcon from '@mui/icons-material/Search';

const Usersentry = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:5000/auth/userlog?name=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setRows(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchData(); // Fetch data based on search term
  };

  if (loading) {
    return (
      <div>
        <Adminnav />
        <h2 className='gridhi'>User Log</h2>
        <div className='load'>Loading...</div>
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
        <h2 className='gridhi'>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div>
      <Adminnav />
      <h2 className='gridhi'>User Log</h2>

      {/* Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex' }}>
          &nbsp;&nbsp;&nbsp;
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '6px 10px',
              width: '200px',
              border: '1px solid #ccc',
              borderRadius: '20px 0 0 20px',
              outline: 'none'
            }}
            placeholder="Search Users"
          />
          <button
            type="submit"
            style={{
              padding: '6px 10px',
              backgroundColor: 'lightgreen', // Light green color
              color: 'white',
              border: '1px solid lightgreen',
              borderRadius: '0 20px 20px 0',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <SearchIcon />
          </button>
        </form>
      </div>

      <TableContainer component={Paper} className='table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='tableCell'>User ID</TableCell>
              <TableCell className='tableCell'>Name</TableCell>
              <TableCell className='tableCell'>Email</TableCell>
              <TableCell className='tableCell'>Address</TableCell>
              <TableCell className='tableCell'>Mobile NO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rows) && rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell className='tableCell'> {row._id}</TableCell>
                <TableCell className='tableCell'>
                  <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className='tableCell'>{row.email}</TableCell>
                <TableCell className='tableCell'>{row.address}</TableCell>
                <TableCell className='tableCell'>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Usersentry;
