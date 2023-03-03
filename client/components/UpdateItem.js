import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import { fetchSingleItem, deleteItem, updateItem } from '../store/slices/items';

const UpdateItem = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();

  const item = useSelector((state) => state.items.selectedItem);
  const user = useSelector((state) => state.auth.user);

  const [isItem, setIsItem] = useState(true);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemStock, setItemStock] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleItem(itemId));
    }
  }, [itemId]);

  useEffect(() => {
    if (item) {
      setItemName(item.name || '');
      setItemDescription(item.description || '');
      setItemImageUrl(item.imageUrl || '');
      setItemStock(item.stock || '');
      setItemPrice(item.price || '');
    }
  }, [item]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (item && item.id) {
      try {
        await dispatch(
          updateItem({
            id: item.id,
            name: itemName,
            description: itemDescription,
            imageUrl: itemImageUrl,
            stock: itemStock,
            price: itemPrice,
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteItem(id));
      setIsItem(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (user.role !== 'admin') {
    return <Navigate to="/home" />;
  }
  if (!item.id) {
    return <Navigate to="/home" />;
  }
  if (!isItem) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="row apart">
      <img className="item-img" src={item.imageUrl} />
      <div style={{ flex: 2, padding: '2rem' }}>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={itemImageUrl}
              onChange={(e) => setItemImageUrl(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={itemStock}
              onChange={(e) => setItemStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={itemPrice}
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
            />
          </div>
          <button type="submit">Save changes</button>
        </form>
        <div className="delete-button">
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
