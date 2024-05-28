import contactsServices from "../services/contactsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const getAllContacts = async (req, res) => {
  const filter = { owner: req.user._id };
  const fields = "-owner -createdAt -updatedAt";
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  if (favorite) filter.favorite = favorite;
  const [results, totalResults] = await Promise.all([
    contactsServices.listContacts({ filter, fields, settings }),
    contactsServices.countContacts(filter),
  ]);

  res.json({ page, perPage: limit, totalResults, results });
};

const getOneContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsServices.getContactById({ _id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsServices.removeContact({ _id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsServices.updateContact({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
