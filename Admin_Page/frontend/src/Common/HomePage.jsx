import React from "react";
import { motion } from "framer-motion";
import { FaStore, FaQrcode, FaShieldAlt, FaCheckCircle } from "react-icons/fa";
import NavBar from "./NavBar";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 via-indigo-100 to-pink-100 flex flex-col">
            {/* Navbar */}
            <NavBar/>

            {/* Hero Section */}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16 flex-grow">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-lg"
                >
                    <h2 className="text-5xl font-extrabold text-indigo-700 mb-6 leading-snug">
                        Verify Medicines. <br /> Protect Your Health.
                    </h2>
                    <p className="text-gray-700 text-lg mb-6">
                        MedTrack helps customers and pharmacies authenticate medicines through
                        secure QR codes. Ensure every purchase is genuine and safe.
                    </p>
                    <a
                        href="#verify"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all"
                    >
                        Verify Now
                    </a>
                </motion.div>

                <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
                    alt="Medicine Verification"
                    className="w-80 md:w-[400px] mt-10 md:mt-0"
                />
            </div>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center text-indigo-700 mb-12">
                        Why Choose MedTrack?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <FaShieldAlt className="text-indigo-600 text-5xl mb-4" />,
                                title: "Secure Authentication",
                                desc: "Every medicine is tracked with a tamper-proof QR code."
                            },
                            {
                                icon: <FaStore className="text-green-600 text-5xl mb-4" />,
                                title: "Verified Shops",
                                desc: "Only registered and trusted pharmacies are in our network."
                            },
                            {
                                icon: <FaQrcode className="text-pink-600 text-5xl mb-4" />,
                                title: "Easy to Use",
                                desc: "Scan the QR code to instantly verify your medicine."
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-lg text-center"
                            >
                                {item.icon}
                                <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section
                id="verify"
                className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center"
            >
                <motion.h3
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold mb-6"
                >
                    Scan & Verify Your Medicine Instantly
                </motion.h3>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold shadow-lg"
                >
                    Start Scanning
                </motion.button>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-white py-6 text-center text-gray-600">
                <p>
                    © {new Date().getFullYear()} MedTrack. All Rights Reserved. | Built with 💜
                </p>
            </footer>
        </div>
    );
}
