import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";

// import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// import Users, {loader as usersLoader} from "./pages/Users";
import Blog, {loader as blogLoader} from "./pages/Blog";
import Search, {loader as searchLoader} from "./pages/Search";
// import SingleBlog, {loader as singleBlogLoader} from "./pages/SingleBlog"
// import MyComments, {loader as myCommentsLoader} from "./pages/MyComments";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="blog" element={<Blog />} loader={blogLoader} />
            <Route path="search" element={<Search />} loader={searchLoader} />
            
            {/*
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
            <Route path="blog/:id" element={<SingleBlog />} loader={singleBlogLoader} />
            */}
        </Route>
    )
);