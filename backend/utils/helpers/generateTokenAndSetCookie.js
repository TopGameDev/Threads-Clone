import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })

    res.cookie("jwt", token, {
        httpOnly: true, // This makes the cookie not accessible by the browser - MORE SECURE
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        sameSite: "strict", // Protect from CSRF Attacks
    })

    return token;
}

export default generateTokenAndSetCookie;