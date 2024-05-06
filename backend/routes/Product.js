import express from "express";
import { createProducts, getProducts, updateProducts, deleteProducts, getProductsById } from "../controllers/Product.js";

const productRouter = express.Router();

productRouter.get('/list', getProducts); 
productRouter.get('/list/:id', getProductsById); 
productRouter.post('/create', createProducts); 
productRouter.delete('/:id', deleteProducts); 
productRouter.put('/:id', updateProducts); 

export default productRouter;
