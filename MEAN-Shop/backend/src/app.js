import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './database';

import accessRoutes from './routes/access.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';

const app = express();

/* Config */
app.set( 'port', process.env.PORT || 3000 );
app.use( cors() );
app.use( morgan('dev') );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );

/* Middlewares */
app.use( '/api/access', accessRoutes );
app.use( '/api/product', productRoutes );
app.use( '/api/cart', cartRoutes );


app.get('/', (req,res) => {
    res.send("Welcome my friend");
});

export default app;