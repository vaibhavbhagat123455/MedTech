import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStore, FaUser, FaPhone, FaCity, FaEnvelope } from "react-icons/fa";
import NavBar from "../Common/NavBar";

export default function ShopDetails() {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/admin/shops")
            .then((res) => setShops(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-indigo-700 text-center mb-10">
                    Verified Medical Shops
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {shops.map((shop) => (
                        <div
                            key={shop._id}
                            className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transform transition-all duration-300"
                        >
                            {/* Shop Name */}
                            <h2 className="text-2xl font-bold text-indigo-700 flex items-center mb-3">
                                <FaStore className="mr-2 text-indigo-500" /> {shop.shopName}
                            </h2>

                            {/* Owner */}
                            <p className="text-gray-700 mb-2 flex items-center">
                                <FaUser className="mr-2 text-gray-500" /> {shop.ownerName}
                            </p>

                            {/* Type */}
                            <p className="text-gray-700 mb-2">
                                <span className="font-semibold">Type:</span> {shop.shopType}
                            </p>

                            {/* City */}
                            <p className="text-gray-700 mb-2 flex items-center">
                                <FaCity className="mr-2 text-gray-500" /> {shop.city}
                            </p>

                            {/* Contact */}
                            <p className="text-gray-700 mb-2 flex items-center">
                                <FaPhone className="mr-2 text-gray-500" /> {shop.contactNumber}
                            </p>

                            {/* Email */}
                            {shop.email && (
                                <p className="text-gray-700 mb-4 flex items-center">
                                    <FaEnvelope className="mr-2 text-gray-500" /> {shop.email}
                                </p>
                            )}

                            {/* View Details Button */}
                            <Link
                                to={`/shop/${shop.shopID}`}
                                className="block text-center bg-indigo-600 text-white py-2 rounded-xl font-semibold shadow hover:bg-indigo-700 transition-all"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}
