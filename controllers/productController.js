const { getProductsDto, getProductsByIdDto, deleteAllProductsDto, addProductDto } = require('../dto/productsDto');


const validateObject = ( objeto ) => { 
  return Object.values(objeto).includes('')
}


const imageUrl = ( url ) => {
  const ext = /(\.jpg|\.jpeg|\.png|\.gif)$/i
  return ext.test( url )
}


const addProductController = async ( product ) => {
  if ( !validateObject( product ) & imageUrl ( product.thumbnail )) {
    await addProductDto ( product);
    return true;
  };
  return false  ;
};

const getProductsController = async() => {
  const products = await getProductsDto();
  return products;
};

const getProductByIdController = async( id ) => {
  const product = await getProductsByIdDto( id )
  return product
}

const deleteProductController = async( id ) => {
  await deleteAllProductsDto( id );
  return;
};


module.exports = { addProductController, getProductsController, getProductByIdController, deleteProductController };