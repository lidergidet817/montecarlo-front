import React from 'react';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';

// componentes
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ProductDetail from './core/ProductDetail';
import Shop from './core/Shop';
import Cart from './core/operations/Cart';
import OrdersComponent from './admin/OrdersComponent';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/shop" exact component={ Shop } />
                <Route path="/signin" exact component={ Signin } />
                <Route path="/signup" exact component={ Signup } />
                <PrivateRoute path="/user/dashboard" exact component={ UserDashboard } />
                <AdminRoute path="/admin/dashboard" exact component={ AdminDashboard } />
                <AdminRoute path="/create/category" exact component={ AddCategory } />
                <AdminRoute path="/create/product" exact component={ AddProduct } />
                <Route path="/product/:productId" exact component={ ProductDetail } />
                <Route path="/cart" exact component={ Cart } />
                <PrivateRoute path="/profile/:userId" exact component={ Profile } />

                <AdminRoute path="/admin/orders" exact component={ OrdersComponent } />
                <AdminRoute path="/admin/products" exact component={ ManageProducts } />
                <AdminRoute path="/admin/product/update/:productId" exact component={ UpdateProduct } />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
