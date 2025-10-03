import React from 'react'
import { motion } from "framer-motion";
import { FaStore, FaQrcode, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const NavBar = () => {
    return (
        <div>
            <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
                <a href="/">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-indigo-700"
                >
                    MedTrack
                </motion.h1>
                </a>
                <div className="space-x-6">
                    <a href="/selection" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Add +
                    </a>

                    <a href="/shops" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Shops
                    </a>

                    <a href="/medicines" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Medicines
                    </a>

                    <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Features
                    </a>
                    <a href="#verify" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Verify Medicine
                    </a>
                    <a href="#contact" className="text-gray-700 hover:text-indigo-600 font-medium">
                        Contact
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default NavBar