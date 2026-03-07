import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import AuthLayout from "../Layouts/AuthLayout";
import AdminLayout from "../Layouts/AdminLayout";

import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Researchs from "../Pages/Researchs/Researchs.jsx";
import Research from "../Pages/Research.jsx";
import Supervison from "../Pages/Supervison.jsx";
import Project from "../Pages/Project";
import Member from '../Pages/Member'
import Thesis from "../Pages/Thesis";
import Contact from "../Pages/Contact";
import Publications from "../Pages/Publications.jsx";

import Journal from "../Pages//Publication/Journal.jsx";
import Conferences from "../Pages//Publication/Conferences.jsx";
import Seminar from "../Pages//Publication/Seminar.jsx";
import Books from "../Pages/Publication/Book.jsx";

import ViewDetails from "../Components/Details/ProjectsDetails.jsx";
import Student from "../Components/Student.jsx";

import Departments from "../Pages/Researchs/Departments.jsx";
import DepartmentDetails from "../Components/Details/DepartmentDetails.jsx";
import Teams from "../Pages/Researchs/Teams.jsx";
import TeamDetails from "../Components/Details/TeamDetails.jsx";
import ExperimentalPlatforms from "../Pages/Researchs/ExperimentalPlatforms.jsx";
import OtherCountryProjects from "../Pages/Researchs/OtherCountryProjects.jsx";
import ThesisDetails from "../Components/Details/ThesisDetails.jsx";

import EditHome from "../AdminPages/Information/EditHome.jsx";
import EditImage from "../AdminPages/Information/EditImage.jsx";
import EditAboutLab from "../AdminPages/About/EditAboutLab.jsx";
import EditAboutProf from "../AdminPages/About/EditAboutProfessor.jsx";
import EditResearchInterest from "../AdminPages/About/EditResearch_Interest.jsx";
import EditDepartments from "../AdminPages/Research/EditDepartments.jsx";
import EditTeams from "../AdminPages/Research/EditTeams.jsx";
import EditNavigation from "../AdminPages/Research/EditNavigation.jsx";
import EditExperimentalPlatforms from "../AdminPages/Research/EditExperimentalPlatforms.jsx";
import EditOtherCountryProjects from "../AdminPages/Research/EditOtherCountryProjects.jsx";
import EditJournal from "../AdminPages/Publication/EditJournal.jsx";
import EditConferences from "../AdminPages/Publication/EditConferences.jsx";
import EditSeminar from "../AdminPages/Publication/EditSeminar.jsx";
import EditBookChapter from "../AdminPages/Publication/EditBookChapter.jsx";
import EditAcademicThesis from "../AdminPages/Supervisors/EditAcademicThesis.jsx";
import EditAcademicProjects from "../AdminPages/Supervisors/EditAcademicProjects.jsx";
import EditMembers from "../AdminPages/EditMembers.jsx";
import EditContacts from "../AdminPages/EditContact.jsx";
import EditFooter from "../AdminPages/Footer.jsx";
import Dashboard from "../AdminPages/Dashboard.jsx";


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
                children: [
                    {
                        path: "researchs",
                        element: <Researchs />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="departments" replace />
                            },
                            {
                                path: "departments",
                                element: <Departments />,
                            },
                            {
                                path: "departments/:id",
                                element: <DepartmentDetails />,
                            },
                            {
                                path: "teams",
                                element: <Teams />,
                            },
                            {
                                path: "teams/:id",
                                element: <TeamDetails />,
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
                        path: "publications",
                        element: <Publications />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="journal" replace />
                            },
                            {
                                path: "journal",
                                element: <Journal />,
                                loader: () => fetch("/Publication/Journal.json").then(res => res.json())
                            },
                            {
                                path: "conferences",
                                element: <Conferences />,
                                loader: () => fetch("/Publication/Conference.json").then(res => res.json())
                            },
                            {
                                path: "seminar",
                                element: <Seminar />,
                                // loader: () => fetch("/Publications/Seminar.json").then(res => res.json())
                            },
                            {
                                path: "books",
                                element: <Books />,
                                // loader: () => fetch("/Publications/Books.json").then(res => res.json())
                            }
                        ]
                    }
                ]
            },
            {
                path: "supervison",
                element: <Supervison />,
                children: [
                    {
                        path: "thesis",
                        element: <Thesis />,
                    },
                    {
                        path: "thesis/:id",
                        element: <ThesisDetails />,

                    },
                    {
                        path: "projects",
                        element: <Project />,
                    },
                    {
                        path: "projects/:id",
                        element: <ViewDetails />
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
            // Dashboard
            {
                index: true,
                element: <Dashboard />
            },

            // ==========================================
            // INFORMATION SECTION
            // ==========================================
            {
                path: "information/home",
                element: <EditHome />
            },
            {
                path: "information/image",
                element: <EditImage />
            },
            // ==========================================
            // ABOUT SECTION
            // ==========================================
            {
                path: "about/lab",
                element: <EditAboutLab />
            },
            {
                path: "about/professor",
                element: <EditAboutProf />
            },
            {
                path: "about/research-interest",
                element: <EditResearchInterest />
            },

            // ==========================================
            // RESEARCH SECTION
            // ==========================================
            {
                path: "research/departments",
                element: <EditDepartments />
            },
            {
                path: "research/teams",
                element: <EditTeams />
            },
            {
                path: "research/navigation",
                element: <EditNavigation />
            },
            {
                path: "research/experimental-platforms",
                element: <EditExperimentalPlatforms />
            },
            {
                path: "research/other-country-projects",
                element: <EditOtherCountryProjects />
            },

            // ==========================================
            // PUBLICATION SECTION
            // ==========================================
            {
                path: "publication/journal",
                element: <EditJournal />
            },
            {
                path: "publication/conferences",
                element: <EditConferences />
            },
            {
                path: "publication/seminar",
                element: <EditSeminar />
            },
            {
                path: "publication/book-chapter",
                element: <EditBookChapter />
            },

            // ==========================================
            // SUPERVISORS SECTION
            // ==========================================
            {
                path: "supervisors/academic-thesis",
                element: <EditAcademicThesis />
            },
            {
                path: "supervisors/academic-projects",
                element: <EditAcademicProjects />
            },

            // ==========================================
            // MEMBERS SECTION
            // ==========================================
            {
                path: "members",
                element: <EditMembers />
            },

            // ==========================================
            // CONTACTS SECTION
            // ==========================================
            {
                path: "contacts",
                element: <EditContacts />
            },

            // ==========================================
            // PROBLEM SECTION
            // ==========================================
            {
                path: "footer",
                element: <EditFooter />
            }
        ]
    },
    { path: "*", element: <h2>Error</h2> }
]);
export default router;