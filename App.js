import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    location: "",
    contactNumber: "",
  });

  const fetchItems = () => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      itemName: "",
      location: "",
      contactNumber: "",
    });

    fetchItems();
  };

  const markAsClaimed = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: "PUT",
    });

    fetchItems();
  };

  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/api/items/${id}`, {
      method: "DELETE",
    });

    fetchItems();
  };

  return (
    <div className="container">
      <h1 className="title">Community Lost & Found</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location Found"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="grid">
        {items.map((item) => (
          <div
            key={item._id}
            className={`card ${
              item.status === "claimed" ? "claimed" : ""
            }`}
          >
            <h3>{item.itemName}</h3>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Contact:</strong> {item.contactNumber}</p>
            <p className="status">{item.status.toUpperCase()}</p>

            <div className="buttons">
              {item.status === "found" && (
                <button
                  className="claimBtn"
                  onClick={() => markAsClaimed(item._id)}
                >
                  Mark as Claimed
                </button>
              )}

              <button
                className="deleteBtn"
                onClick={() => deleteItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;