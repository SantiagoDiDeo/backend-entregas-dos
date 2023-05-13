import express from  'express';
import passport from 'passport';
import multer from 'multer';
import '../DB/config/auth.js';

const { Router } = express;
const sessRouter = Router();
import {getAllUsersController, createUserController, getUserControllerByUsername} from '../controllers/userController.js';
import logger from '../logger/logger.js';
import  sendEmail  from '../messages/email.js';
import  sendWhatsapp  from '../messages/whatsapp.js';
import  sendSMS  from '../messages/message.js';
import  {getAllProductsController}  from '../controllers/productController.js';

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

  sessRouter.get('/', async (req, res) => {
    const users = await getAllUsersController()
    res.render('form.handlebars', {users: users});
  });

 

sessRouter.post('/signup', 
passport.authenticate('signup'),
 async (req, res) => {

    const existentUser = await getUserControllerByUsername(req.body.username);
    if (existentUser) {
        res.status(403).send('el usuario ya existe');
        return;
    }; 
    const user = req.body;
    await createUserController(user);
      
    req.session.username = req.body.username;

    res.redirect('/products');
});

sessRouter.post('/login',
  passport.authenticate('login'),
  async (req, res) => {
    const { username, password } = req.body;

    const existentUser = await getUserControllerByUsername(username);

    if (!existentUser || !compareSync(password, existentUser.password)) {
      res.status(403).send('el usuario no existe o es incorrecto');
      return;
    }

    req.session.username = existentUser.username;
    res.redirect('/products');
  }
);


 sessRouter.get('/logout',  (req,res) => {
     req.session.destroy(  () => {
      res.send(`Hasta luego ${req.session.username}`);
   });
   res.redirect('/');
});


export default sessRouter;