import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    FaCapsules,
    FaCalendarAlt,
    FaBox,
    FaIndustry,
    FaInfoCircle,
    FaExclamationTriangle,
    FaRupeeSign,
    FaSearch,
} from "react-icons/fa";
import NavBar from "../Common/NavBar";

export default function MedicinesPage() {
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        // Fetch data from backend
        axios
            .get("http://localhost:8080/api/admin/medicines") // Replace with your API
            .then((res) => {
                const data = res.data;
                const aggregated = [];

                // Aggregate by BrandName + Composition
                data.forEach((item) => {
                    const index = aggregated.findIndex(
                        (m) =>
                            m.BrandName === item.BrandName &&
                            m.Composition === item.Composition
                    );

                    if (index !== -1) {
                        aggregated[index].quantity += 1;
                        aggregated[index].SubTextCode = aggregated[index].SubTextCode.concat(
                            item.SubTextCode
                        );
                    } else {
                        aggregated.push({ ...item, quantity: 1 });
                    }
                });

                setMedicines(aggregated);
            })
            .catch((err) => console.error(err));
    }, []);

    // Filter and search
    const filteredMedicines = medicines
        .filter((med) =>
        (med.BrandName.toLowerCase().includes(search.toLowerCase()) ||
            med.Composition.toLowerCase().includes(search.toLowerCase()))
        )
        .map((med) => {
            if (statusFilter === "all") return med;
            const filteredSub = med.SubTextCode.filter(
                (pill) => pill.Status === statusFilter
            );
            return { ...med, SubTextCode: filteredSub, quantity: filteredSub.length };
        })
        .filter((med) => med.quantity > 0); // remove medicines with no pills after filtering

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-indigo-700 text-center mb-8">
                    Medicines Inventory
                </h1>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                    <div className="relative w-full md:w-1/2">
                        <FaSearch className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by Brand or Composition"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 p-3 w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="used">Used</option>
                        </select>
                    </div>
                </div>

                {/* Medicines List */}
                <div className="space-y-6">
                    {filteredMedicines.map((med, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold text-indigo-700 flex items-center">
                                    <FaCapsules className="mr-2 text-indigo-500" />
                                    {med.BrandName} ({med.Composition})
                                </h2>
                                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-semibold">
                                    Quantity: {med.quantity}
                                </span>
                            </div>

                            {/* Medicine Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <p className="flex items-center text-gray-700">
                                    <FaBox className="mr-2 text-gray-500" /> Batch: {med.BatchNumber}
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-gray-500" /> Mfg:{" "}
                                    {new Date(med.MDate).toLocaleDateString()}
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <FaCalendarAlt className="mr-2 text-gray-500" /> Exp:{" "}
                                    {new Date(med.EDate).toLocaleDateString()}
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <FaRupeeSign className="mr-2 text-gray-500" /> MRP: {med.MRP}
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <FaIndustry className="mr-2 text-gray-500" /> Manufacturer:{" "}
                                    {med.Manufacturer}
                                </p>
                                <p className="flex items-center text-gray-700">
                                    <FaInfoCircle className="mr-2 text-gray-500" /> Storage:{" "}
                                    {med.StorageInstructions}
                                </p>
                                <p className="flex items-center text-gray-700 col-span-1 md:col-span-2">
                                    <FaExclamationTriangle className="mr-2 text-yellow-600" /> Precautions:{" "}
                                    {med.Precautions}
                                </p>
                            </div>

                            {/* Pills / SubTextCode */}
                            <div className="flex flex-wrap gap-3">
                                {med.SubTextCode.map((pill) => (
                                    <span
                                        key={pill._id}
                                        className={`px-3 py-1 rounded-full font-semibold text-white ${pill.Status === "pending"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                            }`}
                                    >
                                        {pill.TextCode} ({pill.Status})
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    {filteredMedicines.length === 0 && (
                        <p className="text-center text-gray-500 text-xl mt-10">
                            No medicines found.
                        </p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
