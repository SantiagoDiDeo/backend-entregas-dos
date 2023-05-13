import { expect, assert } from 'chai';
import { addProductController, getProductByIdController, getAllProductsController, deleteProductByIdController, updateProductController } from '../controllers/productController.js';
import mongoose from 'mongoose';

describe('product controller MONGODB', () => {
        // it('should return empty array if no product is added or an array of products', async () => {
        //         const result = await getAllProductsController();
        //         expect(result).to.be.an('array');

        // });

        // it('should return a product added', async () => {
        //         const productToAdd = {
        //         title: 'manzana',
        //         description: 'lorem ipsum dolor sit am',
        //         code: 1,
        //         price: 100,
        //         stock: 10,
        //         thumbnail: 'fruit.jpg'
        //         };
        //         await addProductController(productToAdd);
        //         const result = await getAllProductsController();
        //         console.log("🚀 ~ file: controller.product.test.js:23 ~ it ~ result:", result)
        //         expect(result).to.be.an('array')


        // });

        // it('should return a product by id', async () => {
        //         const id = '6452c74e4f466587f0b1c7ad';
        //         const expectedId = new mongoose.Types.ObjectId(id);
        //         const result = await getProductByIdController(id);
        //         expect(result._id).to.deep.equal(expectedId);
        // });
        

        // it('should delete product by id', async () => {
        //         const id = '6452c74e4f466587f0b1c7ad';
        //         const idObj = new mongoose.Types.ObjectId(id);
        //         const productsBeforeDeletion = await getAllProductsController();
        //         const result = await deleteProductByIdController(idObj);
        //         const productsAfterDeletion = await getAllProductsController();
                
        //         expect(productsBeforeDeletion.length).to.equal(productsAfterDeletion.length + 1);

        // });
});

describe('product controller MEMORY', async () => {

        it('should should return empty array if no product is added or an array of products', async () => {
                const result = await getAllProductsController();
                console.log("🚀 ~ file: controller.product.test.js:53 ~ it ~ result:", result)
                expect(result).to.be.an('array');
        });

        it('should return a product added', async () => {
                const productToAdd = {
                title: 'banana',
                description: 'lorem ipsum dolor sit am',
                code: 1,
                price: 100,
                stock: 10,
                thumbnail: 'fruit.jpg'
                };
                await addProductController(productToAdd);
                const result = await getAllProductsController();
                console.log("🚀 ~ file: controller.product.test.js:66 ~ it ~ result:", result)
                expect(result).to.be.an('array')
        });

        it('should return a product by id', async () => {
                const users = await getAllProductsController();
                const id = users[0].id;
                const result = await getProductByIdController(id);
                console.log("🚀 ~ file: controller.product.test.js:74 ~ it ~ result:", result)
                expect(result._id).to.deep.equal(id);
        });

        
        it('should delete product by id', async () => {
                const users = await getAllProductsController();
                const id = users[0].id;
                const productsBeforeDeletion = await getAllProductsController();
                console.log("🚀 ~ file: controller.product.test.js:84 ~ it ~ productsBeforeDeletion:", productsBeforeDeletion)
                await deleteProductByIdController(id);
                const productsAfterDeletion = await getAllProductsController();
                console.log("🚀 ~ file: controller.product.test.js:87 ~ it ~ productsAfterDeletion:", productsAfterDeletion)
                expect(productsBeforeDeletion.length).to.equal(productsAfterDeletion.length + 1);
        });

});