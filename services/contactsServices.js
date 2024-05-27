import Contact from "../models/Contact.js";

const listContacts = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings);
};

const countContacts = (filter) => Contact.countDocuments(filter);

const getContactById = (filter) => Contact.findOne(filter);

const removeContact = (filter) => Contact.findOneAndDelete(filter);

const addContact = (data) => Contact.create(data);

const updateContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

export default {
  listContacts,
  countContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
