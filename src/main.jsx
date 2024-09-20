import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import ActivePosts from './pages/ActivePosts.jsx'
import InactivePosts from './pages/InactivePosts.jsx'


import AddPost from "./pages/AddPost";
import Login from './pages/Login.jsx'
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";
import Profile from './pages/Profile.jsx'
import LikedPosts from './pages/LikedPosts.jsx'
import SavedPosts from './pages/SavedPosts.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyPosts from './pages/MyPosts.jsx'
import EmailVerification from './pages/EmailVerification.jsx'
import EmailConfirmation from './pages/EmailConfirmation.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/profile",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Profile />
                </AuthLayout>
            ),
        },
        {
            path: "/dashboard",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Dashboard />
                </AuthLayout>
            )
        },
        {
            path: "/my-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <MyPosts />
                </AuthLayout>
            ),
            children: [
                {
                    path: "/my-posts/active-posts",
                    element: (
                        <AuthLayout authentication>
                            {" "}
                            <ActivePosts />
                        </AuthLayout>
                    ),
                },
                {
                    path: "/my-posts/inactive-posts",
                    element: (
                        <AuthLayout authentication>
                            {" "}
                            <InactivePosts />
                        </AuthLayout>
                    ),
                }
            ]
        },
        {
            path: "/liked-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <LikedPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/saved-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <SavedPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/verify-email",
            element: (
                <AuthLayout authentication>
                    <EmailVerification />
                </AuthLayout>
        ),
        },
        {
            path: "/confirm-email",
            element:(
                <AuthLayout authentication>
                    <EmailConfirmation />
                </AuthLayout>
                ), 
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
