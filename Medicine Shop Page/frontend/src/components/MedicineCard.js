import './MedicineCard.css';

const MedicineCard = ({ medicine, type }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#28a745';
            case 'pending': return '#ffc107';
            case 'used': return '#17a2b8';
            case 'expired': return '#dc3545';
            default: return '#6c757d';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    const usedPills = medicine.SubTextCode.filter(sub => sub.Status === 'used').length;
    const totalPills = medicine.SubTextCode.length;

    return (
        <div className={`medicine-card ${type}`}>
            <div className="card-header">
                <h3 className="brand-name">{medicine.BrandName}</h3>
                <span className="text-code">#{medicine.TextCode}</span>
            </div>
            
            <div className="card-body">
                <div className="medicine-info">
                    <p><strong>Composition:</strong> {medicine.Composition}</p>
                    <p><strong>Manufacturer:</strong> {medicine.Manufacturer}</p>
                    <p><strong>Batch:</strong> {medicine.BatchNumber}</p>
                    <p><strong>Mfg:</strong> {formatDate(medicine.MDate)}</p>
                    <p><strong>Exp:</strong> {formatDate(medicine.EDate)}</p>
                    <p><strong>MRP:</strong> ₹{medicine.MRP}</p>
                </div>
                
                {type === 'sold' && (
                    <div className="pills-info">
                        <div className="pills-progress">
                            <div 
                                className="progress-bar"
                                style={{ 
                                    width: `${(usedPills / totalPills) * 100}%`,
                                    backgroundColor: getStatusColor('used')
                                }}
                            ></div>
                        </div>
                        <span className="pills-count">
                            {usedPills}/{totalPills} pills used
                        </span>
                    </div>
                )}
                
                <div className="sub-codes">
                    {medicine.SubTextCode.map((sub) => (
                        <span 
                            key={sub._id}
                            className="sub-code"
                            style={{ backgroundColor: getStatusColor(sub.Status) }}
                            title={`Status: ${sub.Status}`}
                        >
                            {sub.TextCode}
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="card-footer">
                <small className="storage-info">💊 {medicine.StorageInstructions}</small>
                <small className="precaution">⚠️ {medicine.Precautions}</small>
            </div>
        </div>
    );
};

export default MedicineCard;