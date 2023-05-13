import mongoose from 'mongoose';
import {getDao} from '../dao/factoryClasses.js';
import { nanoid } from 'nanoid';

const mapProduct = (product) => product ?
  ({
  _id: product.id,
  title: product.title,
  description: product.description,
  code: product.code,
  price: product.price,
  stock: product.stock,
  thumbnail: product.thumbnail,
  }) : null;

const getAllProductsDto = async() => {
    const dao = await getDao();
    const allProducts = await dao.products.getAllProducts({});
    return allProducts.map(product => mapProduct(product));
  };
  
  const addProductDto = async (productToAdd) => {
      const dao = await getDao();
      const newProduct = await dao.products.saveProduct({
        ...productToAdd,
        createdAt: new Date().toLocaleString(),
    });
      return mapProduct(newProduct);
    };


const getProductsByIdDto = async(id) => {
    const dao = await getDao();
    if (mongoose.Types.ObjectId.isValid(id)) {
        id = id.toString();
      }
    const getProductById = await dao.products.getProductById(id);
    return getProductById;
};

const updateProductDto = async (id, productToUpdate) => {
    const dao = await getDao();
    if (mongoose.Types.ObjectId.isValid(id)) {
      id = id.toString();
    }
    const updatedProduct = await dao.products.updateProduct(id, productToUpdate);
    return mapProduct(updatedProduct);
  };

const deleteProductByIdDto = async (id) => {
    const dao = await getDao();
    const deleteProduct = await dao.products.deleteProduct(id);
    return mapProduct(deleteProduct);
};

const deleteAllProductsDto = async() => {
    const dao = await getDao();
    await dao.products.deleteAllProducts();
    return;
};


  

export  {getAllProductsDto, getProductsByIdDto , updateProductDto , deleteProductByIdDto ,deleteAllProductsDto, addProductDto};
