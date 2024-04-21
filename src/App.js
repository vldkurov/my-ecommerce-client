import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./routing/router";
import {globalStyles} from "./App.styled";
import {Global} from "@emotion/react";
import AuthLayout from "./components/auth/AuthLayout/AuthLayout";


function App() {
    return (
        <AuthLayout>
            <Router>
                <Global styles={globalStyles}/>
                <AppRoutes/>
            </Router>
        </AuthLayout>
    );
}

export default App;
