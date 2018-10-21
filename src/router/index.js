import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routesConfig } from './config';

export let RouterComponent = () => (
    <BrowserRouter>{renderRoutes(routesConfig)}</BrowserRouter>
);
