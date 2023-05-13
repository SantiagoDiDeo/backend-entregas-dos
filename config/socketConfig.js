// Archivo: websockets.js
import { Server } from 'socket.io';
import { getAllProductsController, addProductController } from '../controllers/productController.js';
import { getChatsController, addChatsController } from '../controllers/chatController.js';
import logger from '../logger/logger.js';

export function initializeWebsockets(httpServer) {

    const io = new Server(httpServer, { cors: { origin: '*' } });

    io.on('connection', async (socket) => {
        logger.info(`New connection id: ${socket.id}`);

        socket.on('getProduct', async (product) => {
            const products = await getAllProductsController(product);
            io.sockets.emit('newProduct', products);
        });

        socket.on('newProduct', async (product) => {
            const productToAdd = await addProductController(product);
            io.sockets.emit('newProduct', productToAdd);
        });

        socket.on('newChat', async (msg) => {
            await getChatsController();
            const chatToAdd = await addChatsController(msg);
            io.sockets.emit('newChat', chatToAdd);
        });
    });
};
