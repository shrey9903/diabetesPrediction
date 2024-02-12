import { createContext, useReducer } from 'react'

export const BlogsContext = createContext()

export const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return { 
        blogs: action.payload 
      }
    case 'SET_BLOG':
      return { 
        singleblog: action.payload 
      }
    case 'CREATE_BLOG':
      return { 
        blogs: [action.payload, ...state.blogs] 
      }
    case 'DELETE_BLOG':
      return { 
        blogs: state.blogs.filter(w => w._id !== action.payload._id) 
      }
    case 'CREATE_COMMENT':
      return {
        comment: action.payload
      }
    default:
      return state
  }
}

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, { 
    blogs: null,
    singleblog : null,
    comment: null,
  })
  
  return (
    <BlogsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </BlogsContext.Provider>
  )
}