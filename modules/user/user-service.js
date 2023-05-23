const User = require('./User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res) => {
    try {

    let { email } = req.body;
    const { password } = req.body;

    email = String(email).toLowerCase();

    const existingUser = await User.findOne({ email });

    if(!existingUser){
        return res.status(400).json({
            data:null,
            message: 'Error: email or password incorrect'
        })
    }

    const isPasswordSame = await bcrypt.compare(password, existingUser.passwordHash);

    if(!isPasswordSame){
        return res.status(400).json({
            data:null,
            message: 'Error: email or password incorrect'
        })
    }

    const accessToken = jwt.sign(
        existingUser.id, 
        process.env.JWT_PK,
        {
            algorithm: 'HS512', 
        }
    );

    return res.status(200).json({
        data: {
            accessToken,
        },
        message: 'success'
    })

    } catch(e){
        console.error(e);
        return res.sendStatus(500);
    }
}

const register = async (req, res) => {
    try {

    const { password, fullName } = req.body;
    let { email } = req.body;

    if(!email){
        return res.status(400).json({
            data:null,
            message: 'Error: provide email address'
        })
    }

    if(!password){
        return res.status(400).json({
            data:null,
            message: 'Error: provide password'
        })
    }

    email = String(email).toLowerCase();

    const existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(400).json({
            data:null,
            message: 'Error: email already taken. Choose a different email'
        })
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const createdUser = await User.create({
        email,
        passwordHash,
        fullName
    })

    const accessToken = jwt.sign(
        createdUser.id, 
        process.env.JWT_PK,
        {
            algorithm: 'HS512', 
            // expiresIn: '12h',
        }
    );

    return res.status(201).json({
        data: {
            accessToken
        },
        message: 'success'
    })

    } catch(e){
        console.error(e);
        return res.sendStatus(500);
    }
}

module.exports = {
    authenticate,
    register
}