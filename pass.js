const bcrypt = require("bcryptjs");

// async () => {
//   const pass = await bcrypt.hash("12345678", 10);
//   console.log(pass);
// };
// var pass;

// bcrypt.hash("12345678", 10, function (err, hash) {
//   pass = hash;
// });
// console.log(pass);

// let encryptedPassword;
// bcrypt.hash("sdfghs", 10).then((data) => {
//   encryptedPassword = data;
// });
// console.log(encryptedPassword);

// console.log(bcrypt.hash("sdfghs", 10), (err, hash) => {
//   return hash;
// });

// let password = "asfkljsfdf";

// const Password = async (password) => {
//   const newPass = await bcrypt.hash(password, 10, (err, hash) => {
//     if (err) return err;
//     return hash;
//   });
//   return newPass;
// };

// const pwd = await Password("slkdfjdslkfj");

// console.log(pwd);

// const generatePassword = async (password) => {
//   return await new Promise((res, rej) => {
//     // Your hash logic
//     bcrypt.hash(password, 10, (err, hash) => {
//       if (err) rej(err);
//       res(hash);
//     });
//   });
// };

// const wwww = await generatePassword("lskdfjslkd");
// console.log(wwww);

// const hash = bcrypt.hashSync("12412412", 10);

// console.log(hash);

const hashedPass = await bcrypt.hash("sdlkjfsdg", 10);
const pp = hashedPass;

console.log(pp);
