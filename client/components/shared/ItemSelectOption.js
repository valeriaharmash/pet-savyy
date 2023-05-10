import React from 'react';

const ItemSelectOption = ({ itemId, qty, stock, handleQuantityChange, limit }) => {
  switch (stock) {
    case 0:
      return <p>Out of Stock</p>;
    case 1:
      return <p>Only One left in stock</p>;
    default:
      let itemOptions;
      if (stock >= limit) {
        itemOptions = new Array(limit).fill(0).map((v, idx) => idx + 1);
      } else {
        itemOptions = new Array(stock).fill(0).map((v, idx) => idx + 1);
      }
      return <select
        style={{ marginBottom: '1rem' }}
        value={qty}
        onChange={(event) => handleQuantityChange(itemId, event.target.value)}
      >
        {itemOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>;
  }
};

export default ItemSelectOption;