import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";
import { formatFlatContact, formatJsonToTable } from "../../../core/formatter";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const contact = req.body;
    const formattedContact = formatFlatContact(contact);
    await connectMongoDB();
    await Contact.create(formattedContact);
    return res
      .status(201)
      .send(`<div>Contact has been created succesfully!</div>`);
  } else if (req.method === "GET") {
    await connectMongoDB();
    const { id, format } = req.query;
    if (id) {
      if (format == "true") {
        const contact = await Contact.findById(id);
        res.status(200).send(`<tr>${formatJsonToTable(contact)}</tr>`);
      } else {
        const contact = await Contact.findById(id);
        return res.status(200).json({ contact });
      }
    } else {
      const contacts = await Contact.find();
      return res.status(200).json({ contacts });
    }
  } else if (req.method === "DELETE") {
    await connectMongoDB();
    const { id } = req.query;
    try {
      await Contact.findByIdAndDelete(id);
      return res.status(200).send("<td></td>");
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete contact" });
    }
  } else if (req.method === "PUT") {
    // Update a contact

    const { id, format } = req.query;
    const contactUpdates = req.body;
    try {
      await connectMongoDB();
      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { $set: formatFlatContact(contactUpdates) },
        { new: true },
      );
      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      if (format == "true") {
        const newContact = await Contact.findById(updatedContact.id);
        return res
          .status(200)
          .send(`<tr>${formatJsonToTable(newContact)}</tr>`);
      } else {
        return res.status(200).json({ updatedContact });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to update contact" + error });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
