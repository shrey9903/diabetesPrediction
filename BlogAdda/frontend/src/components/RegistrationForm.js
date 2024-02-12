import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Avatar} from "@material-tailwind/react"

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function RegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname : '',
    email : '',
    pwd : '',
    conpwd : '',
    profilepic : '',
  });
  const [mes, setMes] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8080/registration", formData)
      .then((response) => {
        // console.log(response.data.mes);
        setMes(response.data.mes);

        if (response.data.flag === null) {
          navigate("/login");
        }
      });
  };

  const [image, setImage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleImageChange = async(e) => {
    const {name} = e.target;
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
      setFormData({
        ...formData,
        [name] : reader.result,
      })
    }
  }

  return (
    // <div className="wrapper">
    //     <h1>SignUp</h1>

    //     <form onSubmit={handleSubmit}>
    //         <fieldset>
    //             <div>
    //                 <label>Full Name: </label>
    //                 <input name="fullname" type="text" onChange={setFormData} required></input>
    //             </div>
    //             <div>
    //                 <label>Email: </label>
    //                 <input name="email" type="email" onChange={setFormData} required></input>
    //             </div>
    //             <div>
    //                 <label>password: </label>
    //                 <input name="pwd" type="password" onChange={setFormData} required></input>
    //             </div>
    //             <div>
    //                 <label>Confirm Password: </label>
    //                 <input name="conpwd" type="password" onChange={setFormData} required></input>
    //             </div>
    //             <div>
    //                 <label>Profile Picture: </label>
    //                 <input name="profilepic" type="file" onChange={setFormData} required></input>
    //             </div>
    //         </fieldset>
    //         <div>
    //             <button type="submit">Submit</button>
    //         </div>
    //     </form>

    //     {mes && <h3>{mes}</h3>}
    // </div>

    <div className="App bg-gray-900 h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center">
      <div className="h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56 animate-pulse"></div>
      <div className="h-35-r w-35-r bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-full absolute top-96 -left-20 animate-pulse"></div>
      <div className="container h-5/6 w-96 bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm">
        <form
          className="h-full flex flex-col justify-evenly items-center"
          onSubmit={handleSubmit}
        >
          <div className="font-poppins text-white text-2xl tracking-wider">
            SignUp
          </div>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            className="input-text"
            onChange={handleInputChange}
            required
          ></input>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input-text"
            onChange={handleInputChange}
            required
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="pwd"
            className="input-text"
            onChange={handleInputChange}
            required
          ></input>
          <input
            type="password"
            placeholder="Confirm Password"
            name="conpwd"
            className="input-text"
            onChange={handleInputChange}
            required
          ></input>
          {/* <input type='file' placeholder='Profile Picture' name='profilepic' className='input-text' onChange={setFormData} required></input> */}
          <div class="input_container">
            <input type="file" id="fileUpload" placeholder='Profile Picture' name='profilepic' className='input-text' onChange={handleImageChange} required />
          </div>
          {image && <div className="h-32 flex gap-4 pl-10">
           <Avatar src={image} alt="avatar" variant="rounded" />
          </div> }
          <input
            type="submit"
            className="font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80"
          />
          {mes && (
            <div className="font-poppins text-red-600 bg-transparent focus:outline-none tracking-wide">
              {mes}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
