import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToggleOnTwoToneIcon from '@mui/icons-material/ToggleOnTwoTone';
import ToggleOffTwoToneIcon from '@mui/icons-material/ToggleOffTwoTone';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import './addcategory.scss';
import baseUrl from '../../../Api';
import Categoryedit from './Categoryedit';
import Adminnav from '../Adminhome/Adminnav';
import LoadingIcons from 'react-loading-icons';

const CategoryView = () => {
  const [category, setCategory] = useState([]);
  const [selected, setSelected] = useState();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  useEffect(() => {
    axios
      .get(baseUrl + '/category/categoryview')
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  const deleteValues = (id) => {
    console.log('Inactive', id);
    axios.put(baseUrl + '/category/inactive/' + id).then((response) => {
      alert('Inactive');
      window.location.reload(false);
    });
  };

  const activeValues = (id) => {
    console.log('Active', id);
    axios.put(baseUrl + '/category/active/' + id).then((response) => {
      alert('Active');
      window.location.reload(false);
    });
  };

  const updatevalues = (value) => {
    console.log('updated', value);
    setSelected(value);
    setUpdate(true);
  };

  if (loading) {
    return ( // Display loading indicator if data is loading
    <div className="loading-animation">
    <LoadingIcons.BallTriangle stroke="green" />
  </div>
    );
  }

  if (update) {
    return <Categoryedit data={selected} method='put' />;
  }

  return (
    <div>
      <Adminnav />
      <div>
        <h2  className='gridhi' >Category View</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ width: '300px' }}>Category Name</th>
              <th style={{ width: '300px' }}>Status</th>
              <th style={{ width: '200px' }}>Edit</th>
              <th style={{ width: '300px' }}>Active</th>
              <th style={{ width: '300px' }}>Inactive</th>
            </tr>
          </thead>
          <tbody>
            {category.map((item) => (
              <tr key={item._id}>
                <td>{item.Categoryname}</td>
                <td>{item.Status}</td>
                <td>
                  <ModeEditOutlineIcon
                    color='success'
                    onClick={() => updatevalues(item)}
                  />
                </td>
                <td>
                  <ToggleOnTwoToneIcon
                    color='primary'
                    onClick={() => activeValues(item._id)}
                  />
                </td>
                <td>
                  <ToggleOffTwoToneIcon
                    color='error'
                    onClick={() => deleteValues(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryView;
