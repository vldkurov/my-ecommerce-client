import {css} from '@emotion/react';

export const gridStyle = css`
    display: grid;
    gap: 20px;
    padding: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

    @media (max-width: 768px) {
        /* Tablets and below */
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
        /* Smartphones */
        grid-template-columns: 1fr;
    }
`;
