import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxage: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attack by not allowing the client side to access the cookie
    sameSite: "strict", //prevent CSRF attack by not allowing the cookie to be sent along with cross-origin requests
    secure: process.env.NODE_ENV === "production" ? true : false,
  });
};

export default generateTokenAndSetCookie;
