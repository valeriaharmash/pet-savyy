import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../store/slices/items';

const CreateItem = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [authMode, setAuthMode] = useState(mode);
  const [notification, setNotification] = useState();

  const item = useSelector((state) => state.items.selectedItem);

  useEffect(() => {
    setAuthMode(mode);
  }, [mode]);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setNotification('Please enter item name.');
    } else if (!description) {
      setNotification('Please enter item description.');
    } else if (!price) {
      setNotification('Please enter item price.');
    } else if (!stock) {
      setNotification('Please enter number of items in stock.');
    } else {
      const { payload } = await dispatch(
        createItem({ name, description, price, stock, imageUrl })
      );
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setImageUrl('');
      navigate(`/items/${payload.item.id}`);
    }
  };

  return (
    <div className='column'>
      <form onSubmit={handleSubmit}>
        <div className='row apart'>
          <label htmlFor='itemName'>Item Name:</label>
          <input
            name='itemName'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='row apart'>
          <label htmlFor='itemDescription'>Item Description:</label>
          <input
            name='itemDescription'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='row apart'>
          <label htmlFor='itemPrice'>Item Price:</label>
          <input
            name='itemPrice'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className='row apart'>
          <label htmlFor='itemStock'>Number of items in stock:</label>
          <input
            name='itemStock'
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className='row apart'>
          <label htmlFor='imageUrl'>Image:</label>
          <input
            name='itemUrl'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {notification && <div className='notif'>{notification}</div>}

        <div className='row around'>
          <button
            type='submit'
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
