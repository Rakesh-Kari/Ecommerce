import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { gettingProductsById } from "../../Redux/Productslice";
import { Button } from "../../utils/Button";

export const DetailsProducts = () => {
    const dispatch = useDispatch();
    const selectedProduct = useSelector((state) => state.product.users);
    const loading = useSelector((state) => state.product.loading);
    const { id } = useParams();

    useEffect(() => {
        dispatch(gettingProductsById(id));
    }, [dispatch, id]);

    return (
        <div>
            <h2 className="flex justify-center my-10 text-xl font-bold">Product Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : selectedProduct ? (
                <div className="flex h-screen">
                    <div className="w-1/2 h-2/5">
                        {selectedProduct.images && (
                            <img src={selectedProduct.images.url} alt='This is something' />
                        )}
                    </div>

                    <div className="ml-5">
                        <h3 className="text-2xl font-serif">{selectedProduct.title}</h3>
                        <p>{selectedProduct.description}</p>
                        <div>{selectedProduct.price}</div>
                        <div>{selectedProduct.content}</div>
                        <div>{selectedProduct.category}</div>
                        <div className="">
                            <Button label="BUY NOW" />
                        </div>
                    </div>
                    
                </div>
            ) : (
                <p>Product not found</p>
            )}
        </div>
    );
};
