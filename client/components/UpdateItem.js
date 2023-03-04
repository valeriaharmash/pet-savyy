import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { deleteItem, fetchSingleItem, updateItem } from '../store/slices/items';

const UpdateItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {itemId} = useParams();

  const item = useSelector((state) => state.items.selectedItem);
  const user = useSelector((state) => state.auth.user);

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
        navigate(`/items/${item.id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteItem(id));
      navigate('/items');
    } catch (error) {
      console.error(error);
    }
  };

  if (user && user.role !== 'admin') {
    return <Navigate to="/items"/>;
  }

  return (
    <div className="row apart">
      <img className="item-img" src={item.imageUrl}/>
      <div style={{flex: 2}}>
        <form onSubmit={handleUpdate}>
          <div className="row apart">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="row apart">
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </div>
          <div className="row apart">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={itemImageUrl}
              onChange={(e) => setItemImageUrl(e.target.value)}
            />
          </div>
          <div className="row apart">
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={itemStock}
              onChange={(e) => setItemStock(e.target.value)}
            />
          </div>
          <div className="row apart">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={itemPrice}
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="row around">
            <button type="submit">Save</button>
            <button type="button" onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
