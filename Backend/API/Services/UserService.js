const encryptionUtil = require("../Util/encryption");
const userRepository = require("../Repository/UserRepository");


module.exports.getUserByEmail = async (userInfo) => {
    return await userRepository.getUserByEmail(userInfo);
};
module.exports.createUser = async (userInfo) => {
    const hashedPassword = await encryptionUtil.hashPassword(userInfo.password);
    userInfo.password = hashedPassword;
    userInfo.avatar = Math.random().toString();
    return await userRepository.createUser(userInfo);
};
