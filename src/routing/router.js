import {Route, Routes,} from "react-router-dom";
import {lazy, Suspense} from "react";
import Layout from "../components/common/Layout/Layout";


const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage/ProductsPage'));
const ProductsByCategoryPage = lazy(() => import('../pages/ProductsByCategoryPage/ProductsByCategoryPage'))
const ProductDetailsPage = lazy(() => import('../pages/ProductDetailsPage/ProductDetailsPage'));
const CartPage = lazy(() => import('../pages/CartPage/CartPage'))
const CheckoutPage = lazy(() => import('../pages/CheckoutPage/CheckoutPage'));
const OrdersPage = lazy(() => import('../pages/OrdersPage/OrdersPage'));
const OrderDetailsPage = lazy(() => import('../pages/OrderDetailsPage/OrderDetailsPage'))
// const ProtectedPage = lazy(() => import('../pages/ProtectedPage/ProtectedPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage'));


const AppRoutes = () => {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}> {/* Provide a fallback */}
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/products/all" element={<ProductsPage/>}/>
                    <Route path="/products/all/:categoryId" element={<ProductsByCategoryPage/>}/>
                    <Route path="/products/:productId" element={<ProductDetailsPage/>}/>
                    <Route path="/cart/:cartId" element={<CartPage/>}/>
                    <Route path="/carts/:cartId/checkout" element={<CheckoutPage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/orders/:orderId" element={<OrderDetailsPage/>}/>
                    {/*<Route path="/protected" element={<PrivateRoute element={<ProtectedPage/>}/>}/>*/}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </Layout>
    )
}

export default AppRoutes
