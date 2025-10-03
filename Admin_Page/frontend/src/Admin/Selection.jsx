import React from "react";
import { Pill, Store } from "lucide-react";
import NavBar from "../Common/NavBar";

export default function Selection() {
    return (
        <>
        <NavBar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-6">
            <div className="max-w-3xl w-full">
                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                    Admin Dashboard
                </h1>

                {/* Card Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Add Medicine */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer p-8 text-center">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mx-auto mb-6">
                            <Pill className="w-10 h-10 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Add Medicine
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Register new medicines with unique QR codes, batch details, and
                            expiry for authentication.
                        </p>
                        <a href="/addmed">
                            <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition">
                                Continue
                            </button>
                        </a>
                    </div>

                    {/* Add Medical Shop */}
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer p-8 text-center">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
                            <Store className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Add Medical Shop
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Register licensed pharmacies and shops in the system for verified
                            medicine distribution.
                        </p>
                        <a href="/shopForm">
                            <button className="mt-6 px-6 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition">
                                Continue
                            </button></a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
