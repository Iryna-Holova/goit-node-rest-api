import { Schema, model } from "mongoose";
import hooks from "./hooks.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", hooks.handleSaveError);
contactSchema.pre("findOneAndUpdate", hooks.setUpdateSettings);
contactSchema.post("findOneAndUpdate", hooks.handleSaveError);

const Contact = model("contact", contactSchema);

export default Contact;
