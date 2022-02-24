const bcrypt = require("bcrypt");


module.exports.hashPassword = async (password) => {
    const hashedPassword = await new Promise((resolve, reject) => {
       bcrypt.hash(password, Number(process.env.SALT_ROUNDS), (err, hash) => {
          if (err) reject(err);
          resolve(hash);
       });
    });

    return hashedPassword;
}

module.exports.matchPassword = async (enteredPassword, oldPassword) => {
   return await bcrypt.compare(enteredPassword, oldPassword);
};