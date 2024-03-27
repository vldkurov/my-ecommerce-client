import {Route, Routes,} from "react-router-dom";
import {lazy, Suspense} from "react";
import Layout from "../components/common/Layout/Layout";


const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const ProductPage = lazy(() => import('../pages/ProductsPage/ProductsPage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage/ProductDetailPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage/CheckoutPage'));
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
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/products/:productId" element={<ProductDetailPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    {/*<Route path="/protected" element={<PrivateRoute element={<ProtectedPage/>}/>}/>*/}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
        </Layout>
    )
}

export default AppRoutes
