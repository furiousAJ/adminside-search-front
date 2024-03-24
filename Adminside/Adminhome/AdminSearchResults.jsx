import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import LoadingIcons from 'react-loading-icons';
import baseUrl from '../../../Api';
import Adminnav from '../Adminhome/Adminnav'; // Import Adminnav


const AdminSearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nothingFound, setNothingFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      fetchData(query);
    }
  }, [location.search]);

  const fetchData = (query) => {
    axios.get(`${baseUrl}/product/adminproductview/${encodeURIComponent(query)}`)
      .then(response => {
        setSearchResults(response.data || []);
        setLoading(false);
        if (response.data.length === 0) {
          setNothingFound(true);
        } else {
          setNothingFound(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className='adminprolist'>
      <div className="adminprolistContainer">
        <Adminnav />
        <div>
          <h2 className='adhead'> Product View</h2>
          {loading ? (
            <div className="loading-animation">
              <LoadingIcons.BallTriangle stroke="green" />
            </div>
          ) : (
            <div className='bb'>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>ProductName</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Seller</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResults.map((value, index) => (
                      <TableRow key={index}>
                        <TableCell className='imgad' >
                          {value.Photo && <img src={`data:image/jpeg;base64,${value.Photo.data}`} alt="Product" />}
                        </TableCell>
                        <TableCell>{value.Productname}</TableCell>
                        <TableCell>{value.Productprice}</TableCell>
                        <TableCell>{value.Quantity}</TableCell>
                        <TableCell>{value.Description}</TableCell>
                        <TableCell>{value.category[0]?.Categoryname || 'No Category'}</TableCell>
                        <TableCell>{value.sellerId}</TableCell>
                        <TableCell>{value.Status}</TableCell>
                        <TableCell>
                          <button onClick={() => handleRemoveProduct(value._id)} className='pr'>Remove</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSearchResults;
