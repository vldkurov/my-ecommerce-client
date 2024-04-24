import React from 'react';
import {CategoriesGrid, CategoryCard, PageContainer, PromoSection, WelcomeBanner} from './HomePage.styled';

function HomePage() {
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
