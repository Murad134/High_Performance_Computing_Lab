import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AdminLayout from "../Layouts/AdminLayout";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Research from "../Pages/Research/Research.jsx";
import Publication from "../Pages/Publication";
import Project from "../Pages/Project";
import Member from '../Pages/Member'
import Thesis from "../Pages/Thesis";
import Contact from "../Pages/Contact";

import Dashboard from "../AdminPages/Dashboard";
import EditHome from "../AdminPages/EditHome";
import EditAboutPro from "../AdminPages/EditAboutLab.jsx";
import EditAboutProfess from "../AdminPages/EditAboutProfessor.jsx";
import EditExperience from "../AdminPages/EditExperience";
import EditContact from "../AdminPages/EditContact";
import EditMember from "../AdminPages/EditMember";
import EditPublication from "../AdminPages/EditPublication";

import ViewDetails from "../Components/Details/ProjectsDetails.jsx";
import Student from "../Components/Student.jsx";

import Departments from "../Pages/Research/Departments.jsx";
import DepartmentDetails from "../Components/Details/DepartmentDetails.jsx";
import Teams from "../Pages/Research/Teams.jsx";
import TeamDetails from "../Components/Details/TeamDetails.jsx";
import ExperimentalPlatforms from "../Pages/Research/ExperimentalPlatforms.jsx";
import OtherCountryProjects from "../Pages/Research/OtherCountryProjects.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "about", element: <About /> },
            {
                path: "research",
                element: <Research />,
                loader: () => fetch("/Research/Navigation.json").then(res => res.json()),
                children: [
                    {
                        index: true,
                        element: <Navigate to="departments" replace />
                    },
                    {
                        path: "departments",
                        element: <Departments />,
                        loader: () => fetch("/Research/Departments.json").then(res => res.json())
                    },
                    {
                        // Single department details by slug
                        path: "departments/:slug",
                        element: <DepartmentDetails />,
                        loader: async ({ params }) => {
                            const res = await fetch("/Research/Departments.json");
                            const data = await res.json();
                            const dept = data.departments.find(item => item.slug === params.slug);
                            if (!dept) {
                                throw new Response("Department not found", { status: 404 });
                            }
                            return { ...data, selectedDept: dept };
                        }
                    },
                    {
                        path: "teams",
                        element: <Teams />,
                        loader: () => fetch("/Research/Teams.json").then(res => res.json())
                    },
                    {
                        path: "teams/:teamName",
                        element: <TeamDetails />,
                        loader: async ({ params }) => {
                            const res = await fetch("/Research/Teams.json");
                            const data = await res.json();
                            return data.find(item => item.name === params.teamName);
                        }
                    },
                    {
                        path: "platforms",
                        element: <ExperimentalPlatforms />,
                        loader: () => fetch("/Research/ExperimentalPlatforms.json").then(res => res.json())
                    },
                    {
                        path: "projects",
                        element: <OtherCountryProjects />,
                        loader: () => fetch("/Research/OtherCountryProject.json").then(res => res.json())
                    }
                ]
            },
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
            {
                path: "member",
                element: <Member />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="bsc/current" replace />
                    },
                    {
                        path: ":level/:type",
                        element: <Student />,
                        loader: () => fetch("/member.json").then(res => res.json())
                    }
                ]
            },
            // {
            //     path: "member/:id",
            //     element: <MemberDetails />,
            //     loader: async ({ params }) => {
            //         const res = await fetch("/member.json");
            //         const data = await res.json();
            //         return data.find(item => item.id === Number(params.id));
            //     }
            // },
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