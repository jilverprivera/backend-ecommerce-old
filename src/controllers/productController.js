const Products = require("../models/productModel");
const { v4 } = require("uuid");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productController = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;
      res.status(200).json({ products });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { product_id, images, ...body } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload." });
      if (!product_id) return res.status(400).json({ msg: "No Product_id" });
      const newProduct = new Products({
        product_id,
        name: body.name.toLowerCase(),
        images,
        ...body,
      });
      newProduct.product_id = v4();
      await newProduct.save();

      res.json({ newProduct });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Products.findById(req.params.id);
      res.status(200).json({ product });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProductById: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;

      const productUpdated = await Products.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({
        msg: "Product updated.",
        productUpdated,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProductById: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Category deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
