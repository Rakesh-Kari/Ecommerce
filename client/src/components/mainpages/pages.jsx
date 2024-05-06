import { Register } from "./Register/Register";
import { Cart } from "./cart/cart";
import { Login } from "./login/login";
import { DetailsProducts } from "./products/detailProducts";
import { Product } from "./products/product"
import { BrowserRouter, Route, Routes } from 'react-router-dom';


export const Pages = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/detail/:id" element={<DetailsProducts />}/>
            </Routes>
        </BrowserRouter>
    )
}