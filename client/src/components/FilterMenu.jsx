import React, { useState } from 'react'
import "../components-styles/FilterMenu.css"
import { useStore } from '../context/storecontext'

export const FilterMenu = ({isActive, setIsActive, handleFilter, setGender, setMinPrice, setMaxPrice, setCategory, setInDiscount, inDiscount}) => {

    //const [isActive, setIsActive] = useState(true)

    const {categories} = useStore()

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
                                
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Unisex">Unisex</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Price Range:
                            <input
                                type="number"
                                placeholder="Min"
                                onChange={(e) => setMinPrice(Number(e.target.value))}
                                className="price-input"
                            />
                            <input
                                type="number"
                                    placeholder="Max"
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="price-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Category:
                            <select onChange={e => setCategory(e.target.value)}>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.name}>
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
