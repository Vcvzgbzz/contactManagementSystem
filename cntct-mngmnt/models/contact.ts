import mongoose, { Schema } from "mongoose";

export type Contact = {
  firstName: String;
  lastName: String;
  phoneNumber: String;
  address: {
    street: String;
    city: String;
    state: String;
    postalCode: String;
    country: String;
  };
  email: String;
  dateOfBirth: Date;
  notes: String;
  tags: [String];
  isFavorite: Boolean;
};

const contactSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    email: String,
    dateOfBirth: Date,
    notes: String,
    tags: [String],
    isFavorite: Boolean,
  },
  {
    timestamps: true,
  },
);

const ContactModel =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default ContactModel;
