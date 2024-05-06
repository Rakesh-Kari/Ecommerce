
import { Product } from "../models/Project.js"

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    filtering() {
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit']
        excludedFields.forEach(el => delete(queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))

        return this
    }
    
    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
            console.log(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this
    }

    pagination() {

        const page = this.query.page * 1 || 1;
        const limit = this.query.limit * 1 || 5;
        const skip = (page-1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this
    }
}

export const getProducts = async (req, res) => {
    try {
        const features = new APIFeatures(Product.find(), req.query).filtering().sorting().pagination()
        const products = await features.query
        res.status(200).json({products})
    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}

export const getProductsById = async (req,res) => {
    try {

        const user = await Product.findById(req.params.id);
        res.status(200).json({user})

    } catch(err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const createProducts = async (req, res) => {
    try {
        const { product_id, title, description, content, images, category, price} = req.body;
        if(!images) return res.status(400).json({message: "Image has not been uploaded" })

        const product = await Product.findOne({product_id}) 
        if(product) return res.status(400).json({ message: "Product already exists"})

        const newProduct = await Product.create({
            product_id, title: title.toLowerCase() , description, content, images,category, price
        })

        return res.status(200).json({
            newProduct,
            message: "Product has been created Successfully"
        })

    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}

export const deleteProducts = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id);
        res.json({message: "deleted a product"})

    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}

export const updateProducts = async (req, res) => {
    try {

        const { title, description, content, images, category, price} = req.body;

        if(!images) return res.status(500).json({ message: "No Image uploaded"})

        const product = await Product.findByIdAndUpdate({_id: req.params.id}, {title : title.toLowerCase(), price, description, content, images, category})

        res.status(200).json({messge: "Successfully updated"})

    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
}