import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import  Home  from '@material-ui/icons/Home';
export const SIdeBarData = [

    {
        title: 'Manage Product',
        icon: <AppsIcon />,
        link: '/admin'
    },
    {
        title: 'Add Product',
        icon: <AddIcon />,
        link: '/addProducts'
    },
    {
        title: 'Edit Product',
        icon: <EditIcon />,
        link: '/editProducts'
    },
    {
        title: 'Home',
        icon: <Home/>,
        link: '/'
    }

];

