import React, { useState } from "react";
import { Pill, Hash, Calendar, Factory, IndianRupee, Info, AlertTriangle, ClipboardList } from "lucide-react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import NavBar from "../Common/NavBar";

export default function AddMed() {

    const navigate = useNavigate()

    const [meddt, setMeddt] = useState({
        BrandName: "",
        Composition: "",
        BatchNumber: "",
        MDate: "",
        EDate: "",
        MRP: "",
        Manufacturer: "",
        StorageInstructions: "",
        Precautions: "",
        Quantity: "",      // Total strips/units
        SubQuantity: ""    // Pills per strip
    })

    const handelInputChange = async (e) => {
        const { name, value } = e.target
        setMeddt({
            ...meddt,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post("http://localhost:8080/api/admin/addmed", meddt);
        if (res.data.sts === 1) {
        const quantityAdded = parseInt(meddt.Quantity);
        navigate('/medicinePrint', { state: { quantity: quantityAdded } });
    }
    }

    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Add Medicine Details
                </h2>

                <form className="space-y-6">
                    {/* Brand Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <Pill className="w-5 h-5 text-blue-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="BrandName"
                                type="text"
                                placeholder="Enter brand/trade name"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Composition */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Composition (Active Ingredients)</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <ClipboardList className="w-5 h-5 text-indigo-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="Composition"
                                type="text"
                                placeholder="e.g., Paracetamol IP 500mg"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Batch Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Batch Number</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <Hash className="w-5 h-5 text-green-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="BatchNumber"
                                type="text"
                                placeholder="Enter batch number"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Manufacturing Date & Expiry Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturing Date</label>
                            <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                                <Calendar className="w-5 h-5 text-purple-600 mr-3" />
                                <input
                                    onChange={handelInputChange}
                                    name="MDate"
                                    type="date"
                                    className="flex-1 bg-transparent outline-none text-gray-800"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                                <Calendar className="w-5 h-5 text-red-600 mr-3" />
                                <input
                                    onChange={handelInputChange}
                                    name="EDate"
                                    type="date"
                                    className="flex-1 bg-transparent outline-none text-gray-800"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">MRP (₹)</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <IndianRupee className="w-5 h-5 text-yellow-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="MRP"
                                type="number"
                                placeholder="Enter price (incl. taxes)"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Manufacturer */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <Factory className="w-5 h-5 text-pink-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="Manufacturer"
                                type="text"
                                placeholder="Enter manufacturer name & address"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Storage Instructions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Storage Instructions</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <Info className="w-5 h-5 text-blue-500 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="StorageInstructions"
                                type="text"
                                placeholder="e.g., Store in a cool, dry place"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Warnings */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Warnings & Precautions</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="Precautions"
                                type="text"
                                placeholder="e.g., Keep out of reach of children"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (Strips/Units)</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <Hash className="w-5 h-5 text-green-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="Quantity"
                                type="number"
                                placeholder="Enter total quantity"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Sub-Quantity */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Quantity (Pills per Strip)</label>
                        <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
                            <ClipboardList className="w-5 h-5 text-indigo-600 mr-3" />
                            <input
                                onChange={handelInputChange}
                                name="SubQuantity"
                                type="number"
                                placeholder="Enter sub-quantity per strip"
                                className="flex-1 bg-transparent outline-none text-gray-800"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handelSubmit}
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                        Save Medicine
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}
