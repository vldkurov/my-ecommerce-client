import React, {useEffect} from 'react';
import {CategoriesGrid, CategoryCard, PageContainer, PromoSection, WelcomeBanner} from './HomePage.styled';
import {useDispatch} from "react-redux";
import {setUserData} from "../../features/auth/authSlice";

function HomePage() {

    const dispatch = useDispatch();


    useEffect(() => {
        const hash = window.location.hash;
        const prefix = '#data=';
        if (hash.startsWith(prefix)) {
            const base64 = hash.substring(prefix.length);
            if (base64) {
                const decodedJson = atob(base64);
                const data = JSON.parse(decodedJson);


                localStorage.setItem('accessToken', data.tokens.accessToken);
                localStorage.setItem('refreshToken', data.tokens.refreshToken);
                dispatch(setUserData(data.user));


                window.location.hash = '';
            }
        }
    }, [dispatch]);


    return (
        <PageContainer>
            <WelcomeBanner>
                Welcome to Our E-Commerce Site!
            </WelcomeBanner>
            <CategoriesGrid>
                <CategoryCard>Electronics</CategoryCard>
                <CategoryCard>Fashion</CategoryCard>
                <CategoryCard>Home & Garden</CategoryCard>
                <CategoryCard>Books</CategoryCard>
                <CategoryCard>Toys</CategoryCard>
                <CategoryCard>Sports</CategoryCard>
            </CategoriesGrid>
            <PromoSection>
                Don't Miss Out On Our Exclusive Sale!
            </PromoSection>
        </PageContainer>
    );
}

export default HomePage;
