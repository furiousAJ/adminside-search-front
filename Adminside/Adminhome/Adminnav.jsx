import React, { useState } from 'react'

import ecog from '../../../imgs/ecog.png';
import CategoryIcon from '@mui/icons-material/Category';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';


import StoreIcon from '@mui/icons-material/Store';

import AssessmentIcon from '@mui/icons-material/Assessment';

import TimelineIcon from '@mui/icons-material/Timeline';

import './Adminnav.scss'

import { Link, useNavigate } from 'react-router-dom';
import ecoglogo from './Eco - G (7).png';
import { TbCategoryPlus } from "react-icons/tb";
import baseUrl from '../../../Api';
import axios from 'axios';

const Adminnav = () => {
 
  const navigate = useNavigate();
  const handleLogout = () => {
      localStorage.removeItem("token");
      // Navigate to the login page
      navigate("/sellerlogin");
    };


  return (
    <div>
    <nav className="hnavbar">
      <div className="hlogo">
        <img src={ecog} className='hpi' alt="Your SVG" />
      </div>
      <img src={ecoglogo} className='adminlogo' alt="Your SVG" />
      <div className="hmenu">
        <div className="hmenu-links">
          <div className="husernavContainer">
            
          </div>
        
          <Link to="/adminallproduct" style={{textDecoration:"none"}}>
              <StoreIcon className='adminicon'/>
              <span>Products </span></Link>
          

              <Link to="/category" style={{textDecoration:"none"}}>
              <TbCategoryPlus  className='adminicon'/>              
              <span> Add Category</span></Link>

              <Link to="/viewcategory" style={{textDecoration:"none"}}>
              < CategoryIcon className='adminicon'/>              
              <span> View Category</span></Link>


              <Link to="/sellerlog" style={{textDecoration:"none"}}>
              < TimelineIcon className='adminicon'/>              
              <span> Seller </span></Link>
             

         
          <Link to="/userlog">
            <p className='hhicon'><AssessmentIcon />users</p>
          </Link>
        </div> 
        <Link  to="/alogin" style={{ textDecoration: "none" }}>
          <button onClick={handleLogout} className="hreg-in">Log out</button>
        </Link>
      </div>
      <div className="hmenu-btn">
        <MenuIcon />
      </div>
    </nav>
  </div>
  )
}

export default Adminnav
