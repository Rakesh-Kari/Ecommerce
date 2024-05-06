import { useState } from "react";
import { Button } from "../../utils/Button";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../Redux/Userslice";


export const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    console.log(user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser(user));
            // dispatch(refreshingToken)
            navigate('/')
        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };
    

    return (
        <div>
            <div className="flex flex-col h-screen mt-20">
                <div className="flex justify-center">
                    <div className="border-2 py-5 px-5 w-1/3 rounded-lg mt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">name</label>
                            <input
                                name="name"
                                value={user.name}
                                onChange={handleChangeInput}
                                type="text"
                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md px-4 py-4"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                value={user.email}
                                onChange={handleChangeInput}
                                type="text"
                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md px-4 py-4"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                name="password"
                                value={user.password}
                                onChange={handleChangeInput}
                                type="password"
                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-600 rounded-md px-4 py-4"
                                placeholder="Enter your password"
                            />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex justify-center mt-3">
                            <Button onClick={handleSubmit} label="Submit" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};