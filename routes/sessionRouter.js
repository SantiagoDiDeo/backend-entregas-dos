const express = require( 'express' );
const passport = require('passport');
const multer = require('multer');
require('../DB/config/auth');

const { Router } = express;
const sessRouter = Router();
const {getUserController, createUserController} = require('../controllers/userController');
const logger = require('../logger/logger');
const { sendEmail } = require('../messages/email');
const { sendWhatsapp } = require('../messages/whatsapp');
const { sendSMS } = require('../messages/message');
const { getProductsController } = require('../controllers/productController');

sessRouter.use(passport.initialize());
sessRouter.use(passport.session());

const upload = multer.diskStorage({
    destination: '../public/uploads',
    filename: (req,file,cb) => {
      cb( null, `${req.params.id}.${file.originalname.split('.').pop()}`)
    }
  });
  
  const avatarUpload = multer ({
    storage: upload,
    limits: {fileSize: 1 * 1024* 1024}
  });

  /* signup y login */

  sessRouter.get('/',  (req, res) => {
    res.render('form', {user: getUserController, userExist: true});
  });

sessRouter.post('/signup', 
passport.authenticate('signup', {failureMessage: 'fallo el registro', failureRedirect: '/'}),
 async (req, res) => {
  const {username, password, email, address, age, phoneNumber, avatar} = req.body;

    const existentUser = await getUserController(username);
    if (existentUser) {
        res.status(403).send('el usuario ya existe');
        return;
    } 

      await createUserController(username, password, email, address, age, phoneNumber, avatar);
      
      req.session.username = username;

      res.send(`hola ${req.session.username}! bienvenido!! `);
      

    
});

sessRouter.post('/login',
passport.authenticate('login', {failureMessage: 'failure authentication', failureRedirect: '/'}),
async (req, res) => {
  const {username, password} = await req.body;

   req.session.username = username;
    req.session.password = password;
   req.session.counter = (req.session.counter ?? 0) + 1;

   const existentUser = await getUserController(username, password);

if(!existentUser) {

  res.status(403).send('el usuario no existe o es incorrecto');
  return;
} 
  res.send(`hola ${req.session.username}! bienvenido!! has entrado ${req.session.counter} veces`);

});

sessRouter.get('./menu/:username', async (req,res) => {
  const username = req.params.username;
    const userData = await getUserController( username );
    const productList = getProductsController(); 

    for ( const element of userData[0].cart ) {
      const item = await userData( username )
      productList.push({ 
        title: item[0].title,
        code: item[0].code,
        cant: element.cant
       })
    }

    sendEmail({
      from: 'Administrador',
      to: process.env.EMAIL_ADMIN,
      subject: `Nuevo pedido de ${username}`,
      text: '',
      html: ( productList )
    })

    sendWhatsapp({
      body: `Nuevo pedido de ${username}`,
      to: userData[0].phoneNumber
    })

    sendSMS({
      body: 'Pedido recibido',
      number: userData[0].phoneNumber
    })
    
    res.status(200).send({ cart: userData })
  }
  );

 sessRouter.get('/logout',  (req,res) => {
     req.session.destroy(  () => {
      res.send(`Hasta luego ${req.session.username}`);
   });
   res.redirect('/');
});


module.exports = sessRouter;