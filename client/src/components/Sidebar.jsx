import React, { useState } from 'react';
import '../components-styles/Sidebar.css'; // Import the CSS file
import { useStore } from '../context/storecontext';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [gender, setGender] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inDiscount, setInDiscount] = useState(false);

    const {categories} = useStore()

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleFilter = () => {
        // Logic for filtering products based on selected criteria
        console.log({ gender, minPrice, maxPrice, inDiscount });
    };

    return (
        <div className="sidebar-container">
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? 'Hide' : 'Show'}
            </button>

            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                {isOpen && (
                    <div>
                        <h3>Filter Options</h3>
                        <div>
                            <label>
                                Gender:
                                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Price Range:
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="price-input"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="price-input"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Category:
                                <select>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={inDiscount}
                                    onChange={() => setInDiscount(!inDiscount)}
                                />
                                In Discount
                            </label>
                        </div>
                        <button onClick={handleFilter}>Filter</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
