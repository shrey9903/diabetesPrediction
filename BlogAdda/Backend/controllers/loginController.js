import Data from "../models/userModel.js";
// const bcrypt = require('bcrypt');
// import bcrypt from 'bcrypt'
// const jwt = require('jsonwebtoken');
import jwt, { decode } from 'jsonwebtoken'


const loginController = async (req, res) => {
  const { email, pwd } = req.body;

  const data = { mes: null, key: null };

  try {
    const user = await Data.findOne({ email });

    if (!user) {
      data.mes = "User not Found";
      return res.send(data);
    }

    //const isPasswordValid = await bcrypt.compare(pwd, user.password);

    if (pwd != user.password) {
      data.mes = "Password is incorrect.";
      return res.send(data);
    }

    else{
        const token = jwt.sign({ userId: user._id }, "your-secret-key", {
            expiresIn: "1h",
        });
        // data.mes = "Login successfully..";
        const decodedToken = jwt.verify(token, "your-secret-key");
        data.mes = "Login Successfully";
        data.key = decodedToken.userId;
        data.user = user;
        console.log(data.key);
        console.log(token.userId);
        return res.send(data);
    }


    // //res.status(200).json({ token });
  } 
  catch (error) {
    //   res.status(500).json({ message: 'Internal server error' });/
    console.log(error);
  }
};

export default loginController