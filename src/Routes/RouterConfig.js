// Layouts
import DashboardLayout from '../Components/Layout/Dashboard/DashboardLayout';
import AuthLayout from '../Components/Layout/Auth/AuthLayout';

// Auth Component
import LogIn from '../Components/Auth/Login';
import SignUp from '../Components/Auth/SignUp';

// Generale component
import NotFound from '../Components/404';

// Page component
import Home from '../Components/Home'; // delete
import Private from '../Components/Home/private'; // delete

import ProductList from '../Components/Product/List';

export default [
    {
        path: '/login',
        type: 'public',
        exact: true,
        component: LogIn,
        layout: AuthLayout,
    },
    {
        path: '/signup',
        type: 'public',
        exact: true,
        component: SignUp,
        layout: AuthLayout,
    },
    // product
    {
        path: '/',
        type: 'private',
        exact: true,
        component: Home,
        layout: DashboardLayout,
    },
    {
        path: '/product/list',
        type: 'private',
        exact: true,
        component: ProductList,
        layout: DashboardLayout,
    },
    {
        path: '/product/add',
        type: 'private',
        exact: true,
        component: ProductList,
        layout: DashboardLayout,
    },


    {
        path: '/private',
        type: 'private',
        exact: true,
        component: Private,
        layout: DashboardLayout,
    },
    {
        path: '*',
        type: 'private',
        exact: true,
        component: NotFound,
        layout: DashboardLayout,
        status: 404,
    },
];
