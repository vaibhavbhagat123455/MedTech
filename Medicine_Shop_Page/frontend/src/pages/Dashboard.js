import { useEffect, useState } from 'react';
import Header from '../components/Header';
import MedicineList from '../components/MedicineList';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';
import { medicineAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            setLoading(true);
            const response = await medicineAPI.getAll();
            setMedicines(response.data);
            setFilteredMedicines(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch medicines');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setFilteredMedicines(medicines);
            return;
        }

        try {
            const response = await medicineAPI.search(query);
            setFilteredMedicines(response.data);
        } catch (err) {
            console.error('Search error:', err);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading medicines...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={fetchMedicines}>Retry</button>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Header />
            
            <main className="main-content">
                <SearchBar onSearch={handleSearch} />
                
                <Stats medicines={filteredMedicines} />
                
                <div className="sections-container">
                    <MedicineList 
                        medicines={filteredMedicines} 
                        type="added" 
                        title="📦 Added Medicines" 
                    />
                    
                    <MedicineList 
                        medicines={filteredMedicines} 
                        type="sold" 
                        title="💰 Sold Medicines" 
                    />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;