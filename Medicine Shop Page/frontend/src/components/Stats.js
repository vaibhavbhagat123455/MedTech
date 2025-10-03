import './Stats.css';

const Stats = ({ medicines }) => {
    const totalMedicines = medicines.length;
    const totalPills = medicines.reduce((sum, med) => sum + med.SubTextCode.length, 0);
    const usedPills = medicines.reduce((sum, med) => 
        sum + med.SubTextCode.filter(sub => sub.Status === 'used').length, 0
    );
    const activeMedicines = medicines.filter(med => 
        med.SubTextCode.some(sub => sub.Status === 'active')
    ).length;

    return (
        <div className="stats-container">
            <div className="stat-card">
                <h3>Total Medicines</h3>
                <span className="stat-number">{totalMedicines}</span>
            </div>
            <div className="stat-card">
                <h3>Total Pills</h3>
                <span className="stat-number">{totalPills}</span>
            </div>
            <div className="stat-card">
                <h3>Pills Used</h3>
                <span className="stat-number">{usedPills}</span>
            </div>
            <div className="stat-card">
                <h3>Active Medicines</h3>
                <span className="stat-number">{activeMedicines}</span>
            </div>
        </div>
    );
};

export default Stats;