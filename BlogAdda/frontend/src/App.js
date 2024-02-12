import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { BlogForm } from './components/BlogForm';
import { DetailedBlogPage } from './pages/DetailedBlogPage';

function App() {
  return (
    // <div className="App">
    //   <NavBar/>
    //   <RegistrationForm />
    //   {/* <LoginForm />  */}
    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
          {/* <Route index element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/addblog" element={<BlogForm/>} />
          <Route path="/detailedblog/:blogid" element={<DetailedBlogPage />} />
          <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>

    // <div className='App bg-gray-900 h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center'>
    //   <div className='h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 animate-pulse'></div>
    //   <div className='h-35-r w-35-r bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-full absolute top-96 -left-20 animate-pulse'></div>
    //     <div className='container h-96 w-96 bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm'>
    //       <form className='h-full flex flex-col justify-evenly items-center'>
    //         <div className='font-poppins text-white text-2xl tracking-wider'>Login</div>
    //         <input type='text' placeholder='username' className='input-text'></input>
    //         <input type='password' placeholder='password' className='input-text'></input>
    //         <input type="submit" className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80'/>
    //       </form>
    //     </div>
    // </div>

  );
}

export default App;