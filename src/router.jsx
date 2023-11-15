import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";

// import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";

// import Users, {loader as usersLoader} from "./pages/Users";
import Classes, {loader as classesLoader} from "./pages/Classes";
import Search, {loader as searchLoader} from "./pages/Search";
import SingleClass, {loader as singleClassLoader} from "./pages/SingleClass";
// import MyComments, {loader as myCommentsLoader} from "./pages/MyComments";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            <Route path="login" element={<Login />} />
            <Route path="classes" element={<Classes />} loader={classesLoader} />
            <Route path="class/:id" element={<SingleClass />} loader={singleClassLoader} />

            <Route path="search" element={<Search />} loader={searchLoader} />
            
            {/*
            <Route path="register" element={<Register />} />
            <Route path="users" 
                element = {
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                } 
                loader={usersLoader} 
            />
            <Route path="mycomments" 
                element = {
                    <ProtectedRoute>
                        <MyComments />
                    </ProtectedRoute>
                } 
                loader={myCommentsLoader} 
            />
            */}
        </Route>
    )
);