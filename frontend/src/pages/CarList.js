import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/cars', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data);
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>Your Cars</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <Link to={`/cars/${car._id}`}>{car.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create">Add New Car</Link>
    </div>
  );
};

export default CarList;
