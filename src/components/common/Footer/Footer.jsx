import React from 'react';
import {FaFacebook, FaInstagram, FaLinkedin, FaTwitter} from 'react-icons/fa';
import {DeveloperLink, FooterContainer, SocialLinks} from './Footer.styled';

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
