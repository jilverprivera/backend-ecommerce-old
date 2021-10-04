const Category = require("../models/categoryModel");
const categoryController = {
    // Get all categories.
    getCategories: async (req, res) => {
        try {
            const categories = await Category.find();
            res.json({ categories });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Create a category.
    // Only Admin can create a category.
    createCategory: async (req, res) => {
        const name = req.body.name.toUpperCase();
        try {
            const category = await Category.findOne({ name });
            if (category) {
                return res.status(400).json({
                    msg: `Category ${category.name} already exist.`,
                });
            }
            const newCategory = new Category({
                name,
            });
            await newCategory.save();
            res.json({
                msg: `Category ${name} created succesfully.`,
                newCategory,
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Only users with Token can access to this request.
    getCategoryById: async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            res.json({ category });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Only Admin can update a category.
    updateCategoryById: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
            res.json({ msg: `Category updated, new name: ${name}` });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // Only Admin can delete a category.
    deleteCategoryById: async (req, res) => {
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.json({ msg: "Category deleted succesfully" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = categoryController;
