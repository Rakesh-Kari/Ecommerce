import { useDispatch, useSelector } from "react-redux";
import { gettingProducts } from "../../Redux/Productslice";
import { useEffect, useState, useMemo } from "react";
import { Button } from "../../utils/Button";
import { Link } from "react-router-dom";

export const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product);

    const [login, setLogin] = useState(false);
    const [admin, setAdmin] = useState(false);

    const token = localStorage.getItem("accessToken")
    console.log("The token is", token)

    useEffect(() => {
        dispatch(gettingProducts());
    }, [dispatch]);

    // Memoize products.users array to prevent unnecessary re-renders
    const memoizedUsers = useMemo(() => {
        return Array.isArray(products.users) ? products.users : [];
    }, [products.users]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Products</h2>
            <div className="grid grid-cols-3 gap-4">
                {memoizedUsers.map((element) => (
                    <div key={element._id} className="border border-white p-4 shadow-lg">
                        <div className="">
                            <img className="w-full h-[500px]" src={element.images.url} alt={element.title} />
                        </div>
                        <div className="flex justify-between px-5 mt-2">
                            <div className="font-bold mb-2">{element.title}</div>
                            <div className="text-blue-600 mb-2">${element.price}</div>
                        </div>
                        <div className="flex justify-between">
                            <Button label={'Buy now'} />
                            <Link to={`detail/${element._id}`}>
                                <Button label={'View Product'} />
                            </Link>
                        </div>    
                    </div>
                ))}
            </div>
        </div>
    );
};
