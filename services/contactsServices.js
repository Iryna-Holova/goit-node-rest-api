import Contact from "../models/Contact.js";

const listContacts = () => Contact.find({});

const getContactById = (contactId) => Contact.findById(contactId);

const removeContact = (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = (data) => Contact.create(data);

const updateContact = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);

const updateStatusContact = (contactId, { favorite }) =>
  Contact.findByIdAndUpdate(contactId, { favorite });

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
