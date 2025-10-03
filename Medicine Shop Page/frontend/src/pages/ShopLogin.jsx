import { useState } from "react";
import { Lock, Mail, Store } from "lucide-react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ShopLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handelSubmit = async (e) =>{
        try{
            const res = await axios.post('http://localhost:5000/api/medicines/login',{email,password})
            if(res.data.sts == 1){
                localStorage.setItem("email",res.data.email)
                navigate('/dashboard');
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
                {/* Logo / Header */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                        <Store size={32} />
                        <h1 className="text-2xl font-bold">Medical Shop Login</h1>
                    </div>
                    <p className="text-gray-500 mt-1">Access your shop dashboard</p>
                </div>

                {/* Form */}
                <form className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
                            <Mail className="text-gray-400 mr-2" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="shop@example.com"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-green-400">
                            <Lock className="text-gray-400 mr-2" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                    onClick={handelSubmit}
                        type="button"
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    © {new Date().getFullYear()} MedQ | Secure Access
                </p>
            </div>
        </div>
    );
};

export default ShopLogin;
