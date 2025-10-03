import MedicineCard from './MedicineCard';
import './MedicineList.css';

const MedicineList = ({ medicines, type, title }) => {
    const filteredMedicines = medicines.filter(medicine => {
        if (type === 'sold') {
            return medicine.SubTextCode.some(sub => sub.Status === 'used');
        }
        return medicine.SubTextCode.every(sub => sub.Status !== 'used');
    });

    return (
        <div className="medicine-list-section">
            <h2 className="section-title">
                {title} 
                <span className="count-badge">{filteredMedicines.length}</span>
            </h2>
            
            {filteredMedicines.length === 0 ? (
                <div className="empty-state">
                    <p>No {type} medicines found</p>
                </div>
            ) : (
                <div className="medicine-grid">
                    {filteredMedicines.map(medicine => (
                        <MedicineCard 
                            key={medicine._id} 
                            medicine={medicine} 
                            type={type}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MedicineList;