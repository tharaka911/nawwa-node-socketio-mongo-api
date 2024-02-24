import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxage: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attack by not allowing the client side to access the cookie
    sameSite: "strict",
    secure:process.env.NODE_ENV === "production" ? true : false
  });
};

export default generateTokenAndSetCookie;
