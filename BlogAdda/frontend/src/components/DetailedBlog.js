import React from "react";
import { useState } from "react";
import { useBlogsContext } from "../hooks/useBlogsContext";
import { DisplayComment } from './DisplayComment';

export const DetailedBlog = ({blog, username, profilepic, comments, commentusernames, commentprofilepics}) => {
  const { dispatch} = useBlogsContext();
  const [comment_details, setcomment_details] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const comment = {comment_details, blogid: blog._id, email: localStorage.getItem('email') };
    console.log(comment);
    const response = await fetch("/blog/comment", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      
    }
    if (response.ok) {
      setError(null);
      setcomment_details("");

      dispatch({ type: "CREATE_COMMENT", payload: json });
    }

    // navigate('/');
  };
  
  return (
    <main class="pt-8 pb-16 bg-gradient-to-r from-slate-900 via-cyan-900 to-gray-800 antialiased">
      <div class="flex justify-between px-4 mx-auto max-w-screen-xl ">
        <article class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header class="mb-4 lg:mb-6 not-format bg-transparent">
            <address class="flex items-center mb-6 not-italic">
              <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <img
                  class="mr-4 w-16 h-16 rounded-full"
                  src={profilepic}
                  alt="Jese Leos"
                />
                <div>
                  <a
                    href="#"
                    rel="author"
                    class="text-xl text-emerald-300"
                  >
                    {username}
                  </a>
                 
                  <p class="text-base text-pink-300">
                    <time>
                      {blog.createdAt}
                    </time>
                  </p>
                </div>
              </div>
            </address>
            <h1 class="mb-4 text-3xl font-semibold leading-tight text-violet-300 lg:mb-6 lg:text-4xl dark:text-white">
              {blog.title}
            </h1>
            <p class="mb-4 text-base leading-tight text-violet-300 lg:mb-6 dark:text-white">
              {blog.short_description }
            </p>
          </header>
            <img
              src={blog.thumbnail}
              alt=""
            />
            <br></br>
            <div class="text-slate-300">
              {blog.content}
            </div>
          <br/>
          <section class="not-format">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg lg:text-2xl font-semibold text-violet-300 dark:text-white">
                Discussion (20)
              </h2>
            </div>
            <form class="mb-6" onSubmit={handleSubmit}>
              <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <label for="comment" class="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="6"
                  class="px-0 w-full text-sm text-gray-900 border-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  onChange={(e) => setcomment_details(e.target.value)}
                  
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </form>
            {comments &&
              comments.map((comment,index) => <DisplayComment comment={comment} commentusername={commentusernames[index]} commentprofilepic={commentprofilepics[index]} key={blog._id} />)}
            
          </section>
        </article>
      </div>
    </main>
  );
};
