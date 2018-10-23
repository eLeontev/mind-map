import React from 'react';
import { Redirect } from 'react-router';
import MapMenu from '../components/map-menu';
import MindMap from '../components/mind-map';
import Login from '../components/login';
import PageNotFound from '../components/page-not-found';

export let routesConfig = [
    {
        path: '/auth/google',
        exact: true,
        component: () => <div>autorizing...</div>
    },
    {
        path: '/auth/google/redirect',
        exact: true,
        component: () => <div>redirecting...</div>
    },
    {
        exact: true,
        path: '/',
        component: () => <Redirect to='/maps' />
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
