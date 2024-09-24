import React, { useState } from 'react';
import "../components-styles/searchBar.css"
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
        navigate("/")
    };

    return (
        <form onSubmit={handleSearch} className='search-bar'>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca tus productos..."
            />
            <button type="submit">S</button>

        </form>
    );
};

export default SearchBar;

