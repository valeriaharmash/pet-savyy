import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../store/slices/items';

const CreateItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createItem({ name, description, price, stock, imageUrl }));
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setImageUrl('');
    navigate('/');
  };

  return (
    <div className="column">
      <form onSubmit={handleSubmit}>
        <div className="row apart">
          <label htmlFor="itemName">Item Name:</label>
          <input
            name="itemName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="row apart">
          <label htmlFor="itemDescription">Item Description:</label>
          <input
            name="itemDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="row apart">
          <label htmlFor="itemPrice">Item Price:</label>
          <input
            name="itemPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="row apart">
          <label htmlFor="itemStock">Number of items in stock:</label>
          <input
            name="itemStock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className="row apart">
          <label htmlFor="imageUrl">Image:</label>
          <input
            name="itemUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="row around">
          <button
            disabled={!name && !description && !price && !stock}
            type="submit"
          >
            Submit
          </button>
          <button onClick={() => navigate('/items')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
