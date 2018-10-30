import Main from '../components/main';
import MapMenu from '../components/map-menu';
import MindMap from '../components/mind-map';
import Login from '../components/login';
import PageNotFound from '../components/page-not-found';

export let routesConfig = [
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
        path: '/maps/:label',
        component: MindMap,
    },
    {
        path: '/*',
        component: PageNotFound,
    },
];
