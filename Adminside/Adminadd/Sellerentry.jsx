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

const Sellerentry = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`http://localhost:5000/sauth/sellerlog?searchQuery=${searchTerm}`)
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
      <h2 className='gridhi'>Seller Log</h2>

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
            placeholder="Search Sellers"
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

      {/* Seller Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Seller ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Sellerentry;
