import { useState, useEffect } from "react";
import { Button } from "../../utils/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, loginUser } from "../../Redux/Userslice";
import axios from "axios";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(user));
            navigate('/');
        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/information", {
                    headers: { Authorization: localStorage.getItem("accessToken") }
                });
                console.log("This is the admin data")
                dispatch(addUser({ isLogged: true, isAdmin: response.data.isAdmin }));
                setIsAdmin(response.data.isAdmin);
            } catch (err) {
                setError(err.response.data.message);
            }
        };

        const isUserLoggedIn = localStorage.getItem("accessToken");
        if (isUserLoggedIn) {
            fetchUserInfo();
        }
    }, []);

    return (
        <div>
            <div className="flex flex-col h-screen mt-20">
                <div className="flex justify-center">
                    <div className="border-2 py-5 px-5 w-1/3 rounded-lg mt-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                value={user.email}
                                onChange={handleChangeInput}
                                type="text"
                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
                                className="mt-1 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
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
