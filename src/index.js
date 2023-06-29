import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ParentComponent from './ParentComponent';
import { ThemeProvider } from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
    <ParentComponent />
    </ThemeProvider>
);