const jwt = require("jsonwebtoken");

const secret_key = "mern-market";

const auth = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQGV4YW1wbGUuY29tIiwiaWF0IjoxNjg3NTk0MDQ4LCJleHAiOjE2ODc2NzY4NDh9.XJgrLPl6G3dZIsAhNJvNysiBx11xB-bpUewsuUrz5Ik";
  // await req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "トークンがありません" });
  }
  try {
    const decoded = await jwt.verify(token, secret_key);
      console.log(decoded);
      req.body.email = decoded.email;
      return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "トークンが正しくないので、ログインして下さい" });
  }
};

module.exports = auth;
