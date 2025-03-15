import {createBrowserRouter, } from 'react-router-dom'
import Login from '../pages/login/Login'
import AdminPanel from '../pages/dashbord/AdminPanel'
import App from '../App'
import  AllCatgr from '../pages/categorie/AllCatgr'

const router=createBrowserRouter([
    {
        path:"/",
        element:<Login/>,
    },
    {
        path:"",
        element:<App/>,
        children:[
           {
                path:'admin',
                element:<AdminPanel/>,
                children:[
                    {
                        path:"categorie",
                        element:<AllCatgr/>
                    },
                    
                ]
            }
        ]

    },
    {
        path:"/categorie",
        element:<AllCatgr/>,
    },
]
)






export default router