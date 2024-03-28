import {Box, List, ListItem, ListItemText, Modal} from "@mui/material";
import React from "react";
import {NavLink as RouterNavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function CategoriesModal({open, onClose}) {
    const navigate = useNavigate();
    const {categories} = useSelector((state) => state.categories);


    const handleCategorySelect = (categoryId) => {
        navigate(`/products/all/${categoryId}`);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="category-selection-modal"
            aria-describedby="category-selection-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300, // Adjust based on your needs
                maxHeight: '80vh', // Prevents the modal from being too tall on small screens
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 2,
                overflowY: 'auto' // Enables vertical scrolling
            }}>
                <Box sx={{mb: 2}}>
                    <RouterNavLink to="/products/all" onClick={onClose} style={{
                        textDecoration: 'none',
                        color: 'inherit', // Use your theme's color here if needed
                        background: '#f5f5f5', // Adjust the background color to be less bright
                        padding: '8px 16px',
                        borderRadius: '4px', // Optional: for rounded corners
                        display: 'inline-block', // For proper padding and background color
                    }}>
                        ← Back to Products
                    </RouterNavLink>
                </Box>
                <List>
                    {categories.map((category) => (
                        <ListItem

                            key={category.categoryId}
                            onClick={() => handleCategorySelect(category.categoryId)}
                            sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0', // Example hover background color
                                },
                                // Additional styles here
                            }}
                        >
                            <ListItemText primary={category.name}/>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Modal>
    )
}

export default CategoriesModal
