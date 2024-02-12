import { useBlogsContext } from "../hooks/useBlogsContext";
import React from "react";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";


export const BlogDetails = ({ blog , username, profilepic}) => {
  const { dispatch } = useBlogsContext();
  
  const handleClick = async () => {
    const response = await fetch("/blog/" + blog._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BLOG", payload: json });
    }
  };

  return (
    <div className="card cursor-pointer transition ease-in-out duration-700 hover:-translate-y-1 hover:scale-110">
      <div className="card-header">
        <img
          src={blog.thumbnail}
          alt="ballons"
        />
      </div>
      <div className="card-body dark:bg-gray-900 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400">
        
        <span className="tag tag-purple">{blog.blogtype}</span>
        <h4>{blog.title}</h4>
        <p>
          {blog.short_description}
        </p>
        <div className="user">
          <img
            src={profilepic}
            alt="user"
          />
          <div className="user-info">
            <h5>{username}</h5>
            <small>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</small>
          </div>
        </div>
      </div>
    </div>
  );
  
     <div className="blog-details">
      <h4>{blog.title}</h4>
      <p><strong>About: </strong>{blog.short_description}</p>
      <p><strong>Content: </strong>{blog.content}</p>
      <p>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div> 
  
};

// export default BlogDetails;
