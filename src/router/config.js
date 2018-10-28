import React from 'react';
import Main from '../components/main';
import MapMenu from '../components/map-menu';
import MindMap from '../components/mind-map';
import Login from '../components/login';
import PageNotFound from '../components/page-not-found';

export let routesConfig = [
    {
        path: '/auth/google',
        exact: true,
        component: () => <div>autorizing...</div>,
    },
    {
        path: '/auth/google/callback',
        exact: true,
        component: () => <div>redirecting...</div>,
    },
    {
        exact: true,
        path: '/',
        component: Main,
    },
    {
        exact: true,
        path: '/maps',
        component: MapMenu,
    },
    {
        exact: true,
        path: '/login',
        component: Login,
    },
    {
        exact: true,
        path: '/maps/:id',
        component: MindMap,
    },
    {
        path: '/*',
        component: PageNotFound,
    },
];
