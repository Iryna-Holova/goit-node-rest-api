import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../decorators/validateBody.js";
import usersSchemas from "../schemas/usersSchemas.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(usersSchemas.registerSchema),
  usersControllers.register
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(usersSchemas.loginSchema),
  usersControllers.login
);

usersRouter.post("/logout", authenticate, usersControllers.logout);

usersRouter.get("/current", authenticate, usersControllers.current);

usersRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(usersSchemas.updateSubscriptionSchema),
  usersControllers.updateSubscription
);

export default usersRouter;
