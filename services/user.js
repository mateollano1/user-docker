const user = require('../models/user');

const getUsers = async() => {
    const response = await user.find()
    return response;
}

createUser = async(newUser) => {
    let userNew = new user(newUser);
    return userNew.save()
        .then(user => user)
        .catch(err => err);
}

deleteUser = async(id) => {
    userD = await user.findByIdAndRemove(id);
    return userD
}

putUser = async(id, userBody) => {

    let usuario = user.findByIdAndUpdate(id, userBody, { new: true });
    return res.status(201)
}

module.exports = {
    getUsers,
    createUser,
    deleteUser,
    putUser,
}