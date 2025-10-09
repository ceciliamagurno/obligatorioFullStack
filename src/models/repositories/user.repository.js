const User = require('../user.model');
const bcrypt = require('bcryptjs');

const findUserByUserName = async (username) => {
    return await User.findOne({ username: username });
}


const isValidPassword = async (password, userPassword) => {
    const result = await bcrypt.compare(password, userPassword);
    return result;
}

const saveUser = async (name, username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name: name,
        username: username,
        password: hashedPassword,
        active: true,
        plan: 'plus'
    });
    const saved = await newUser.save();
    return saved;
}

const findUserById = async (id) => {
    return await User.findById(id);
}   

const updateUserPlan = async (id, newPlan) => {
    const user = await User.findById(id);
    if (!user) return null; 
    user.plan = newPlan;
    const updated = await user.save();
    return updated;
}


module.exports = { findUserByUserName, isValidPassword, saveUser, findUserById, updateUserPlan };