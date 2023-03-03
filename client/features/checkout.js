import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  return (
    <div>
      <h2>Checkout</h2>
      <form>
        <label htmlFor="firstName" className="form-label">
          First Name:
        </label>
        <input
          className="form"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName" className="form-label">
          Last Name:
        </label>
        <input
          className="form"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          className="form"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="imageUrl" className="form-label">
          Image:
        </label>
        <input
          className="form"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label htmlFor="gpa" className="form-label">
          GPA:
        </label>
        <input
          className="form"
          name="gpa"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <label htmlFor="campus" className="form-label">
          Campus:
        </label>
        <select
          className="form"
          name="campus"
          value={selectedCampus}
          onChange={(e) => {
            console.log("VALUE------>", e.target.value);
            setSelectedCampus(e.target.value);
          }}
        >
          {campuses.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSave}
          disabled={!editAllowed}
          className="form-label"
        >
          Save Edit
        </button>
        <button onClick={handleDelete} className="form-label">
          Delete
        </button>
        <button onClick={handleCancel} className="form-label">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Checkout;
