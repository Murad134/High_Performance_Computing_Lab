// import { createBrowserRouter } from "react-router-dom";
// import HomeLayout from "../Layouts/HomeLayout";
// import AuthLayout from "../Layouts/AuthLayout";
// import Login from "../Pages/Login";
// import Register from "../Pages/Register";
// import Home from "../Pages/Home";
// import Publication from "../Pages/Publication";
// import AboutLab from "../Pages/AboutLab";
// import Project from "../Pages/Project";
// import Member from '../Pages/Member'
// import Thesis from "../Pages/Thesis";
// import Contact from "../Pages/Contact";
// import AdminLayout from "../Layouts/AdminLayout";
// import Dashboard from "../AdminPages/Dashboard";
// import EditHome from "../AdminPages/EditHome";
// import EditAbout from "../AdminPages/EditAbout";
// import EditExperience from "../AdminPages/EditExperience";
// import EditContact from "../AdminPages/EditContact";
// import EditMember from "../AdminPages/EditMember";
// import EditPublication from "../AdminPages/EditPublication";
// import ViewDetails from "../Components/ViewDetails";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <HomeLayout />,
//         children: [
//             { path: "/", element: <Home /> },
//             { path: "about", element: <AboutLab /> },
//             {
//                 path: "publication",
//                 element: <Publication />,
//                 children: [
//                     {
//                         path: "thesis",
//                         element: <Thesis />,
//                         loader: () => fetch("/publication.json").then(res => res.json()),
//                     },
//                     {
//                         path: "projects",
//                         element: <Project />,
//                         loader: () => fetch("/publication.json").then(res => res.json()),
//                     },
//                     {
//                         path: "projects/:id",
//                         element: <ViewDetails />,
//                         loader: async ({ params }) => {
//                             const res = await fetch("/publication.json");
//                             const data = await res.json();
//                             return data.find(item => item.id === Number(params.id));
//                         },
//                     },
//                 ],
//             },
//             {
//                 path: 'member',
//                 element: <Member />,
//                 // children: [
//                 //     { path: 'bsc', element: <div>Bsc</div> },
//                 //     { path: 'msc', element: <div>Msc</div> },
//                 //     { path: 'phd', element: <div>PhD</div> },
//                 //     { path: 'alumni', element: <div>Alumni</div> },
//                 // ],
//             },
//             { path: "contact", element: <Contact /> },
//         ],
//     },
//     {
//         path: "auth",
//         element: <AuthLayout />,
//         children: [
//             { path: "login", element: <Login /> },
//             { path: "register", element: <Register /> },
//         ],
//     },
//     {
//         path: "/admin",
//         element: <AdminLayout />,
//         children: [
//             { path: "dashboard", element: <Dashboard /> },
//             { path: "edithome", element: <EditHome /> },
//             { path: "editabout", element: <EditAbout /> },
//             { path: "editexperience", element: <EditExperience /> },
//             { path: "editcontact", element: <EditContact /> },
//             { path: "editmember", element: <EditMember /> },
//             { path: "editpublication", element: <EditPublication /> },
//         ],
//     },
//     { path: "*", element: <h2>Error</h2> },
// ]);
// export default router;


import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import HomeLayout from "../Layouts/HomeLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Publication from "../Pages/Publication";
import About from "../Pages/About";
import Project from "../Pages/Project";
import Member from '../Pages/Member'
import Thesis from "../Pages/Thesis";
import Contact from "../Pages/Contact";
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../AdminPages/Dashboard";
import EditHome from "../AdminPages/EditHome";
import EditAboutPro from "../AdminPages/EditAboutLab.jsx";
import EditAboutProfess from "../AdminPages/EditAboutProfessor.jsx";
import EditExperience from "../AdminPages/EditExperience";
import EditContact from "../AdminPages/EditContact";
import EditMember from "../AdminPages/EditMember";
import EditPublication from "../AdminPages/EditPublication";
import ViewDetails from "../Components/ViewDetails";

// NEW IMPORTS
import Student from "../Pages/Student";     // student.jsx
import Alumni from "../Pages/Alumni";       // alumni.jsx

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "about", element: <About /> },

            {
                path: "publication",
                element: <Publication />,
                children: [
                    {
                        path: "thesis",
                        element: <Thesis />,
                        loader: () =>
                            fetch("/publication.json").then(res => res.json()),
                    },
                    {
                        path: "projects",
                        element: <Project />,
                        loader: () =>
                            fetch("/publication.json").then(res => res.json()),
                    },
                    {
                        path: "projects/:id",
                        element: <ViewDetails />,
                        loader: async ({ params }) => {
                            const res = await fetch("/publication.json");
                            const data = await res.json();
                            return data.find(item => item.id === Number(params.id));
                        }
                    },
                ]
            },
            // {
            //     path: "member",
            //     element: <Member />,
            //     children: [
            //         // {
            //         //     index: true,
            //         //     element: <Navigate to="student/bsc" replace />
            //         // },
            //         {
            //             path: "student/:level",   // bsc, msc, phd → handled dynamically
            //             element: <Student />,
            //             loader: () => fetch("/member.json").then(res => res.json())
            //         },
            //         {
            //             path: "alumni",
            //             element: <Alumni />,
            //             loader: () => fetch("/member.json").then(res => res.json())
            //         }
            //     ]
            // },
            {
                path: "member",
                element: <Member />,
                children: [
                    {
                        index: true,   // ✅ default child route
                        element: <Navigate to="alumni" replace />
                    },
                    {
                        path: "student/:level",   // bsc, msc, phd → handled dynamically
                        element: <Student />,
                        loader: () => fetch("/member.json").then(res => res.json())
                    },
                    {
                        path: "alumni",
                        element: <Alumni />,
                        loader: () => fetch("/member.json").then(res => res.json())
                    }
                ]
            },
            { path: "contact", element: <Contact /> }
        ]
    },

    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> }
        ]
    },

    {
        path: "/admin",
        element: <AdminLayout />,
        children: [

            { index: true, element: <Dashboard /> },
            { path: "edithome", element: <EditHome /> },
            { path: "editabout", element: <EditAboutPro /> },
            { path: "editaboutpro", element: <EditAboutPro /> },
            { path: "editaboutlab", element: <EditAboutProfess /> },
            { path: "editexperience", element: <EditExperience /> },
            { path: "editcontact", element: <EditContact /> },
            { path: "editmember", element: <EditMember /> },
            { path: "editpublication", element: <EditPublication /> }
        ]
    },

    { path: "*", element: <h2>Error</h2> }
]);

export default router;
