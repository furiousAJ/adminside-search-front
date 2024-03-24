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

const Sellersearchresults = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch sellers data from the server
    fetch('http://localhost:5000/sauth/sellerlog/')
      .then(response => response.json())
      .then(data => {
        setSellers(data); // Set fetched sellers data
        setLoading(false); // Update loading state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message); // Update error state
        setLoading(false); // Update loading state
      });
  };

  const handleSearch = () => {
    // Filter sellers based on the search term
    const filteredSellers = sellers.filter(seller => {
      return (
        seller._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSellers(filteredSellers); // Update sellers state with filtered data
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
          placeholder="Search Sellers"
        />
        <button
          onClick={handleSearch}
          style={{ 
            padding: '6px 10px', 
            backgroundColor: '#28a745', // Light green color
            color: 'white', 
            border: '1px solid #28a745', // Light green color
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
                <TableCell className='tableCell'>Seller ID</TableCell>
                <TableCell className='tableCell'>Name</TableCell>
                <TableCell className='tableCell'>Email</TableCell>
                <TableCell className='tableCell'>Address</TableCell>
                <TableCell className='tableCell'>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(sellers) && sellers.map((seller) => (
                <TableRow key={seller._id}> {/* Add key prop */}
                  <TableCell className='tableCell'> {seller._id}</TableCell>
                  <TableCell className='tableCell'>
                    <div className="cellWrapper">
                      <img src={seller.img} alt="" className="image" />
                      {seller.name}
                    </div>
                  </TableCell>
                  <TableCell className='tableCell'>{seller.email}</TableCell>
                  <TableCell className='tableCell'>{seller.address}</TableCell>
                  <TableCell className='tableCell'>{seller.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Sellersearchresults;
