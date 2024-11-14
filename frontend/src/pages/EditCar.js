import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCar = () => {
  const { id } = useParams();  // Get car ID from URL params
  const navigate = useNavigate();

  const [car, setCar] = useState({
    title: '',
    description: '',
    tags: '',
    images: []
  });
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    // Fetch car details when the component mounts
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', car.title);
    formData.append('description', car.description);
    formData.append('tags', car.tags);

    // Append image files to the form data
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append('images', imageFiles[i]);
    }

    // Make PUT request to update car
    const token = localStorage.getItem('token');
    axios.put(`http://localhost:5000/api/cars/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    .then(response => {
      alert('Car updated successfully!');
      navigate(`/cars/${id}`);  // Redirect to car details page after edit
    })
    .catch(err => {
      console.error('Error updating car:', err);
    });
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={car.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={car.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={car.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default EditCar;
