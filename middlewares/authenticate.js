import HttpError from "../helpers/HttpError.js";
import jwt from "../helpers/jwt.js";
import usersServices from "../services/usersServices.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verifyToken(token);
    const user = await usersServices.findUser({ _id: id });
    if (!user || !user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
