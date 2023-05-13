import connectToDb from '../DB/config/connectToDb.js';
import { productModel } from '../DB/model/modelMongo.js';

export class prodMongoDao {

      ID_FIELD = '_id';

      saveProduct = async (productToAdd) => {
        await connectToDb();        
        const product = new productModel(productToAdd);
        await product.save();
        return product;
    };

    getAllProducts = async () => {
      await connectToDb()
      const allProducts = await productModel.find({})
      return allProducts;
    };

    getProductById = async (id) => {
      await connectToDb();
      const productById = await productModel.findOne({ _id: id })
      return productById;
    };

    deleteProduct = async (id) => {
      await connectToDb();
      const deletedProduct = await productModel.deleteOne(id)
      return deletedProduct; 
    };

    deleteAllProducts = async ()=> {return await productModel.deleteMany()};

    updateProduct = async (id, productToUpdate) => {
        return await productModel.updateOne(
            { _id: id },
            { $set: { ...productToUpdate } }
        );
    };

};
