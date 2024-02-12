import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { BlogDetails } from "../components/BlogDetails";
import {Link} from 'react-router-dom';
import { Footer } from '../components/Footer';

import { useEffect } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";

export const HomePage = () => {
  const { blogs, dispatch } = useBlogsContext();
  const [usernames, setusernames] = useState([]);
  const [profilepics, setprofilepics] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("/blog/");
      const json = await response.json();
      console.log(json);
      setusernames(json.usernames);
      setprofilepics(json.profilepics);
      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: json.blogs});
      }
    };
    fetchBlogs();
  }, [dispatch]); 

  return (
    <div className="w-screen">
      <NavBar />
        <div className="home bg-gradient-to-r from-slate-900 via-cyan-900 to-gray-800 scroll-smooth">
          <div className="blogs flex flex-wrap w-screen ml-16 mt-5">
            {blogs &&
              blogs.map((blog,index) => <Link to={`/detailedblog/${blog._id}`}><BlogDetails blog={blog} username={usernames[index]} profilepic={profilepics[index]} key={blog._id} /></Link>)}
          </div>
        </div>
        <Footer/>
    </div>
  );
};
