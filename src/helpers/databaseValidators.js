const { Category, Products, User } = require("../models");

const existUserById = async (id) => {
  // Verificar si el correo existe
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`User not found with this ID: ${id}`);
  }
};
const existCategoryById = async (id) => {
  // Verificar si el correo existe
  const existCategory = await Category.findById(id);
  if (!existCategory) {
    throw new Error(`Category not found with this ID: ${id}`);
  }
};
const existProductById = async (id) => {
  // Verificar si el correo existe
  const existProduct = await Products.findById(id);
  if (!existProduct) {
    throw new Error(`Product not found with this ID: ${id}`);
  }
};

module.exports = { existUserById, existCategoryById, existProductById };
