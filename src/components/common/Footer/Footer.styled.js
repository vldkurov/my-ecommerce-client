import styled from '@emotion/styled';

export const FooterContainer = styled.footer`
    background-color: #282c34;
    color: white;
    text-align: center;
    padding: 20px 0;
`;

export const SocialLinks = styled.div`
    font-size: 24px;
    margin: 10px 0;

    a {
        margin: 0 10px;
        color: white;

        &:hover {
            color: #ccc;
        }
    }
`;

export const DeveloperLink = styled.div`
    font-size: 16px;
    color: #888;
    margin-top: 10px;

    a {
        color: #4ea1f3;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;
