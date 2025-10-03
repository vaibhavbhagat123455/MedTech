import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="🔍 Search by medicine name, composition, manufacturer..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                <button type="submit" className="search-btn">
                    Search
                </button>
                <button 
                    type="button" 
                    onClick={() => {
                        setQuery('');
                        onSearch('');
                    }} 
                    className="clear-btn"
                >
                    Clear
                </button>
            </form>
        </div>
    );
};

export default SearchBar;