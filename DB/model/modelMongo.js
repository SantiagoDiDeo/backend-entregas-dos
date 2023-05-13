import mongoose from 'mongoose';
const { Schema, model } = mongoose;



const productSchema = new Schema({
  timestamp: { type: Date, default: Date.now() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: Number, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: true }
});

productSchema._id = new mongoose.Types.ObjectId();



const cartSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    products: { type: Array, required: true }
});


const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: false },
  age: { type: Number, required: false },
  avatar: { type: String, required: false },
  cart: {type: Array, required: false }
});

const messageSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true }
});


const chatSchema = new Schema({
  chatid: { type: String, required: true },
  messages: [ {userSchema, messageSchema} ]
});



const productModel = model('Product', productSchema);
const cartModel = model('Cart', cartSchema);
const chatModel = model('Chat', chatSchema);
const userModel = model('User', userSchema);



export  { productModel, cartModel, chatModel, userModel };