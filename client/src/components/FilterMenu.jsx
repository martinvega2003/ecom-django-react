import React, { useState } from 'react'
import "../components-styles/FilterMenu.css"
import { useStore } from '../context/storecontext'

export const FilterMenu = () => {

    const [isActive, setIsActive] = useState(false)
    const [gender, setGender] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inDiscount, setInDiscount] = useState(false);

    const {categories} = useStore()

    const handleFilter = () => {
        // Logic for filtering products based on selected criteria
        console.log({ gender, minPrice, maxPrice, inDiscount });
    };

  return (
    <div className={isActive ? "filter-menu active" : "filter-menu"}>
        <button onClick={() => setIsActive(!isActive)} className={isActive ? "toggle-btn active" : "toggle-btn"}>
            {
                isActive ? <p>X</p> : <p>H</p>
            }
        </button>

        <div className="filter-items">
            <div>
                <h3>Filter Options</h3>
                    <div>
                        <label>
                            Gender:
                            <select onChange={(e) => setGender(e.target.value)}>
                                
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
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="price-input"
                            />
                            <input
                                type="number"
                                    placeholder="Max"
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
                                    <option key={category.id}>
                                        {category.name}
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
        </div>
    </div>
  )
}
