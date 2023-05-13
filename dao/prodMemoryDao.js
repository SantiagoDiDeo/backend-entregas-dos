import { nanoid } from 'nanoid';

const products = [];

export class ProdMemoryDao {

  getAllProducts = () => {
    return products;
  };

  saveProduct = (product) => {
    const newProduct = products.push({...product, _id: nanoid()});
    return newProduct;
  };

  getProductById = (id) => {
    const product =  products.find((product) => product.id === id);
    return product;
  };

  deleteProduct = async (id) => {
    const deletedUser = products.deleteOne(id);
    return deletedUser;
  };

  deleteAllProducts = async () => {
    users = [];
    return users;
  };

};





//   deleteAll() {
//     this.schema = [];
//     return;
//   };



// };

// const ProductsMemory = new Container(productModel);

// export default ProductsMemory;