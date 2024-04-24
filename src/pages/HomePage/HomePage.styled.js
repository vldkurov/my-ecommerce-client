import styled from '@emotion/styled';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
`;

export const WelcomeBanner = styled.div`
    width: 100%;
    background-color: #f4f4f4;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CategoriesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    width: 100%;
`;

export const CategoryCard = styled.div`
    background-color: #fff;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    color: #666;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

export const PromoSection = styled.div`
    width: 100%;
    background-color: #ffdede;
    padding: 20px;
    text-align: center;
    font-size: 20px;
    color: #d0342c;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
