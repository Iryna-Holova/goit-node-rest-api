import bcrypt from "bcrypt";
import User from "../models/User.js";

const findUser = (filter) => User.findOne(filter);

const createUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
};

const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

const deleteAllUsers = () => User.deleteMany();

export default { findUser, createUser, updateUser, deleteAllUsers };
