import React, { useState } from 'react';
import SearchBar from './searchBar';
import axios from "axios";
import { useStore } from '../context/storecontext';
import "../components-styles/searchBarWrapper.css"

const SearchBarWrapper = () => {

    const {setSearchedProducts} = useStore()

    const fetchProducts = async (searchQuery) => {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/store/products/products?search=${searchQuery}`);
        setSearchedProducts(res.data);
    };

    return (
        <div className='search-bar-wrapper'>
            <SearchBar onSearch={fetchProducts} />
        </div>
    );
};

export default SearchBarWrapper;
