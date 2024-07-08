const User = require("../../model/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateUniqueUserID = require("../../services/uuid.js");
const secretKey = process.env.SECRET;
 function Login(req, res) {
    const { username, password } = req.body;
    console.log(username,password)
    if(username === '' || password === ''){
        return res.json({success:false , message:'Wetin you dey try do?'})
    }
    User.findOne({username})
        .then(results => {
            if (!results) {
                return res.json({ success: false, message: 'User not found in our system' });
            }
            console.log(results)
            const { userid } = results;
            const retrievedpassword = results.password;
            const usepassword = jwt.verify(retrievedpassword,secretKey)
            const userpassword = usepassword.password.toString()
            const intpassword = password.toString()
            if (userpassword !== intpassword) {
                return res.status(401).json({ success:false , message: 'This Password is Incorrect' });
            }
            else if (userpassword === intpassword) {
                const token = jwt.sign({ userid }, secretKey)
                console.log('Redirecting');
                return res.status(200).json({success:true, message: 'Login Successful', token: token,userid:userid });
            }
        })
        .catch((error) => {
            console.error('Error finding user credentials:', error);
            return res.status(500).json({success:false, message: 'Internal server error' });
        });
};
module.exports = Login;
