import React, { useState } from 'react';
import "../components-styles/searchBar.css"
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
            <button type="submit" className='search-btn'>
                <FontAwesomeIcon icon={faSearch} size='1.5x' className='icon' />
            </button>

        </form>
    );
};

export default SearchBar;

