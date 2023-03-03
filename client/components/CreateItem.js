import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createItem } from "../store/slices/items";

const CreateItem = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [itemName, setItemName] = useState("");
	const [itemDescription, setItemDescription] = useState("");
	const [itemPrice, setItemPrice] = useState("");
	const [itemStock, setItemStock] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(createItem(itemName, itemDescription, itemPrice, itemStock));
		setItemName("");
		setItemDescription("");
		setItemPrice("");
		setItemStock("");
		navigate("/items");
	};

	return (
		<div className="row apart">
			<form onSubmit={handleSubmit}>
				<label htmlFor="itemName">Item Name:</label>
				<input
					name="itemName"
					value={itemName}
					onChange={(e) => setItemName(e.target.value)}
				/>

				<label htmlFor="itemDescription">Item Description:</label>
				<input
					name="itemDescription"
					value={itemDescription}
					onChange={(e) => setItemDescription(e.target.value)}
				/>

				<label htmlFor="itemPrice">Item Price:</label>
				<input
					name="itemPrice"
					value={itemPrice}
					onChange={(e) => setItemPrice(e.target.value)}
				/>

				<label htmlFor="itemStock">Number of items in stock:</label>
				<input
					name="itemStock"
					value={itemStock}
					onChange={(e) => setItemStock(e.target.value)}
				/>

				<button
					disabled={!itemName && !itemDescription && !itemPrice && !itemStock}
					type="submit"
				>
					Submit
				</button>
				<Link to="/items">Cancel</Link>
			</form>
		</div>
	);
};

export default CreateItem;
