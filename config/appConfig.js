// Archivo: app.js
import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import prodRouter from '../routes/prodRouter.js';
import sessRouter from '../routes/sessionRouter.js';
import infoRouter from '../routes/infoRouter.js';
import * as url from 'url';

const app = express();

const __dirname = url.fileURLToPath(new URL('..', import.meta.url));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'secreto1', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views', 'hbs', 'partials'));
app.set('view engine', 'handlebars');
app.engine('handlebars', engine({
    extname: '.hbs',
    defaultLayout: 'main.handlebars',
    layoutsDir: path.join(__dirname, 'views', 'hbs', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'hbs', 'partials')
}));

app.use('/', sessRouter);
app.use('/products', prodRouter);
app.use('/info', infoRouter);

export default app;
