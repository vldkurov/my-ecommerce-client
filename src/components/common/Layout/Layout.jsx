import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {MainContent} from './Layout.styled';


const Layout = ({children}) => {
    return (
        <>
            <Header/>
            <MainContent>{children}</MainContent>
            <Footer/>
        </>
    );
};

export default Layout;
