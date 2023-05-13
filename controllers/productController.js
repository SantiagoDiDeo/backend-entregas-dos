import { getAllProductsDto, getProductsByIdDto, deleteAllProductsDto, addProductDto, deleteProductByIdDto, updateProductDto } from '../dto/productsDto.js';

const validateObject = ( object ) => { 
  return Object.values(object).includes('')
}


const imageUrl = ( url ) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  return ext.test( url )
}


const addProductController = async ( productToAdd ) => {
  try {
    const newProduct = await addProductDto( productToAdd);
    return newProduct;
  } catch (error) {
    throw new Error(`${error}, non-added product`)
  };
};

const getAllProductsController = async() => {
  const getProducts = await getAllProductsDto({});
  if (getProducts.length === 0) {
    return [];
  };
  return getProducts;
};

const getProductByIdController = async( id ) => {
    const productById = await getProductsByIdDto( id )
    return productById;
};

const updateProductController = async (req, res) => {
  try {
    const updatedProduct = await updateProductDto(id, productToUpdate);
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
};

const deleteProductByIdController = async (id) => {
  try {
    const deletedProduct = await deleteProductByIdDto(id);
    return {
      success: true,
      message: `Product with id ${id} was deleted`,
      data: deletedProduct
    };
  } catch (error) {
    return {
      success: false,
      message: `Error deleting product with id ${id}`,
      error: error.message
    };
  }
};


 const deleteAllProductsController = async() => {
//commented for security reasons.
//   await deleteAllProductsDto();
//   return;
};


export  { addProductController, getAllProductsController, getProductByIdController, updateProductController, deleteAllProductsController, deleteProductByIdController };