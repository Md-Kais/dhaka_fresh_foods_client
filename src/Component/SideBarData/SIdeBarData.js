import React from 'react';
import AppsIcon from '@material-ui/icons/Apps';
import AddIcon from '@material-ui/icons/Add';

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
        title: 'Home',
        icon: <Home/>,
        link: '/'
    }

];

