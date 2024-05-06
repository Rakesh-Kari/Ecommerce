import { Category } from "../models/Category.js"

export const CategoryList =  async (req,res) => {
    try {

        const categories = await Category.find()
        res.status(200).json({categories})

    } catch(err) {
        return res.status(500).json({message: err.message})
    }
}

export const createCategory = async (req,res) => {
    try {

        const { name } = req.body;
        const category = await Category.findOne({name})
        if(category) return res.status(400).json({message: "Category alredy exists"})

        const newCategory = await Category.create({
            name
        })

        res.status(200).json({message: "Category has been created"})

    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export const deleteCategory = async (req, res) => {
    try {

        await Category.findByIdAndDelete(req.params.id)
        res.json({message: "Deleted a Category"})
         
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await Category.findByIdAndUpdate(req.params.id, { name }, { new: true }); // Added the third parameter for options
        
        res.json({ message: "Category updated successfully" });
         
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

