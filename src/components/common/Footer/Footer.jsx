import React from 'react';
import styled from '@emotion/styled';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';

const FooterContainer = styled.footer`
    background-color: #282c34;
    color: white;
    text-align: center;
    padding: 20px 0;
`;

const SocialLinks = styled.div`
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

const DeveloperLink = styled.div`
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

function Footer() {
    return (
        <FooterContainer>
            <SocialLinks>
                <a href="https://www.facebook.com" title="Facebook"><FaFacebook/></a>
                <a href="https://www.twitter.com" title="Twitter"><FaTwitter/></a>
                <a href="https://www.instagram.com" title="Instagram"><FaInstagram/></a>
                <a href="https://www.linkedin.com" title="LinkedIn"><FaLinkedin/></a>
            </SocialLinks>
            <DeveloperLink>
                Developed by <a href="https://stately-fenglisu-297ff0.netlify.app" target="_blank"
                                rel="noopener noreferrer">Volodymyr Kurov</a>
            </DeveloperLink>
        </FooterContainer>
    );
}

export default Footer;
