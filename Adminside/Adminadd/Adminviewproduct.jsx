import React, { useState, useEffect } from 'react';
import Adminnav from '../Adminhome/Adminnav';
import './adminviewproduct.scss';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button } from '@mui/material';
import { Buffer } from 'buffer';
import LoadingIcons from 'react-loading-icons';
import axios from 'axios'; // Import Axios
import baseUrl from '../../../Api';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom/dist';

const Adminviewproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:5000/product/adminproductview/')
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data
        setProducts(data || []); // Ensure data is an array or initialize as an empty array
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  
  const handleRemoveProduct = async (id) => {
    try {
      // Ensure that productId is defined before making the request
    
      await axios.delete(`${baseUrl}/product/premove/${id}`);
      // If deletion is successful, remove the product from the state
      setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
      // Optionally, you can show a success message or perform other actions upon successful removal
    } catch (error) {
      console.error('Error removing product:', error.response.data); // Log the specific error received from the server
      // Handle error if deletion fails
      // Optionally, you can show an error message or perform other actions
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/product/adminproductview/?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const searchData = await response.json();
      setProducts(searchData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError(error.message);
      setLoading(false);
    }
  };
  

  return (
    <div className='adminprolist'>
      <div className="adminprolistContainer">
        <Adminnav />
        <div>
          <h2 className='adhead'> Product View</h2>
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
  <form onSubmit={handleSearch} style={{ display: 'flex' }}>
    &nbsp;&nbsp;&nbsp; 
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ 
        padding: '6px 10px', // Adjusted padding
        width: '200px', 
        border: '1px solid #ccc', 
        borderRadius: '20px 0 0 20px', // Curvy edges
        outline: 'none' 
      }}
      placeholder="Search Products"
    />
    <button
      type="submit"
      style={{ 
        padding: '6px 10px', // Adjusted padding
        backgroundColor: '#007bff', 
        color: 'white', 
        border: '1px solid #007bff', 
        borderRadius: '0 20px 20px 0', // Curvy edges
        cursor: 'pointer', 
        outline: 'none' 
      }}
    >
      <SearchIcon />
    </button>
  </form>
</div>
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
                        <TableCell>Product</TableCell>
                        <TableCell>Price ₹</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Seller</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((value, index) => (
                        <TableRow key={index}>
                          <TableCell className='imgad' >
                            {value.Photo && <img src={`data:image/jpeg;base64,${value.Photo.data}`} alt="Product" />}
                          </TableCell>
                          <TableCell>{value.Productname}</TableCell>
                          <TableCell>{value.Productprice}</TableCell>
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


export default Adminviewproduct;
