import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./routing/router";
import {globalStyles} from "./App.styled";
import {Global} from "@emotion/react";

function App() {
    return (
        <Router>
            <Global styles={globalStyles}/>
            <AppRoutes/>
        </Router>

    );
}

export default App;
