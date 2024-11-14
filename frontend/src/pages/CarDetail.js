import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CarDetail = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();  // Get the car ID from URL parameters
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/cars');  // Redirect to the car list after deletion
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);  // Redirect to edit page
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <div>
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={`Car Image ${index + 1}`} />
        ))}
      </div>
      <p>Tags: {car.tags.join(', ')}</p>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CarDetail;
