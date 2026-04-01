export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  const cookieExpire = Number(process.env.COOKIE_EXPIRE) || 5;

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + cookieExpire * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production", // optional
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
