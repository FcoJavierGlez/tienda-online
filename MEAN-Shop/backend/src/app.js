import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './database';

import accessRoutes from './routes/access.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import searchRoutes from './routes/search.routes';
import suggestProductRoutes from './routes/suggest_product.routes';
import userRoutes from './routes/user.routes';

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
app.use( '/api/search', searchRoutes );
app.use( '/api/suggest_products', suggestProductRoutes );
app.use( '/api/user', userRoutes );


app.get('/', (req,res) => {
    res.send("Welcome my friend");
});

export default app;