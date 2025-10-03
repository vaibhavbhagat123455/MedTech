import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { FaStore, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import NavBar from "../Common/NavBar";

// Fix default leaflet marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ setCoordinates }) {
    const [markerPosition, setMarkerPosition] = useState(null);

    useMapEvents({
        click(e) {
            setMarkerPosition(e.latlng);
            setCoordinates(e.latlng);
        },
    });

    return markerPosition ? <Marker position={markerPosition}></Marker> : null;
}

export default function ShopForm() {
    const [formData, setFormData] = useState({
        shopName: "",
        ownerName: "",
        shopType: "",
        contactNumber: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        latitude: "",
        longitude: "",
        openingTime: "",
        closingTime: "",
        daysOpen: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCoordinatesChange = (lat, lng) => {
        setFormData({ ...formData, latitude: lat, longitude: lng });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const shopData = await axios.post('http://localhost:8080/api/admin/addshop',formData)
    };

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-5xl">
                
                {/* Header with logo */}
                <div className="flex items-center justify-center mb-6">
                    
                    <h2 className="text-3xl font-bold text-indigo-700">
                        Add Verified Medical Shop
                    </h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <FaStore className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="shopName"
                                placeholder="Shop Name"
                                value={formData.shopName}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaUser className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="ownerName"
                                placeholder="Shop Owner Name"
                                value={formData.ownerName}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                                required
                            />
                        </div>

                        <select
                            name="shopType"
                            value={formData.shopType}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            required
                        >
                            <option value="">Select Shop Type</option>
                            <option value="Retail">Retail</option>
                            <option value="Wholesale">Wholesale</option>
                            <option value="Chain Store">Chain Store</option>
                        </select>

                        <div className="relative">
                            <FaPhone className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="contactNumber"
                                placeholder="Contact Number"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                                required
                            />
                        </div>

                        <div className="relative">
                            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            />
                        </div>

                        <div className="relative col-span-2">
                            <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="address"
                                placeholder="Street Address / Building / Area"
                                value={formData.address}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                                required
                            />
                        </div>

                        <input
                            type="text"
                            name="city"
                            placeholder="City / District"
                            value={formData.city}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State / Province"
                            value={formData.state}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            required
                        />
                        <input
                            type="text"
                            name="pinCode"
                            placeholder="Pin / Zip Code"
                            value={formData.pinCode}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            required
                        />
                    </div>

                    {/* Geo-coordinates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="number"
                            name="latitude"
                            placeholder="Latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                        />
                        <input
                            type="number"
                            name="longitude"
                            placeholder="Longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                        />
                    </div>

                    {/* Map */}
                    <div className="h-96 w-full mb-4 rounded-xl overflow-hidden shadow-md">
                        <MapContainer
                            center={[20.5937, 78.9629]}
                            zoom={5}
                            style={{ height: "100%", width: "100%", minHeight: "384px" }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <LocationPicker
                                setCoordinates={(coords) =>
                                    setFormData({ ...formData, latitude: coords.lat, longitude: coords.lng })
                                }
                            />
                        </MapContainer>
                        <p className="text-sm text-gray-500 mt-2">
                            Click on the map to select shop location. Coordinates will auto-fill above.
                        </p>
                    </div>

                    {/* Operating Hours */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaClock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="time"
                                name="openingTime"
                                value={formData.openingTime}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            />
                        </div>
                        <div className="relative">
                            <FaClock className="absolute top-3 left-3 text-gray-400" />
                            <input
                                type="time"
                                name="closingTime"
                                value={formData.closingTime}
                                onChange={handleChange}
                                className="pl-10 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                            />
                        </div>
                        <input
                            type="text"
                            name="daysOpen"
                            placeholder="Days Open (e.g., Mon-Sat)"
                            value={formData.daysOpen}
                            onChange={handleChange}
                            className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all mt-4"
                    >
                        Add Shop
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}
