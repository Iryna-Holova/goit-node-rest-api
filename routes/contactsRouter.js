import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import contactsSchemas from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getOneContact);

contactsRouter.delete("/:id", contactsControllers.deleteContact);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactsSchemas.createContactSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(contactsSchemas.updateContactSchema),
  contactsControllers.updateContact
);

export default contactsRouter;
