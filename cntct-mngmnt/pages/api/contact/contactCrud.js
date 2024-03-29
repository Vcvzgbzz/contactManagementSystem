import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post request");
    const contact = req.body;
    await connectMongoDB();
    await Contact.create(contact);
    return res.status(201).send(`<div>Test</div>`);
  } else if (req.method === "GET") {
    await connectMongoDB();
    const contacts = await Contact.find();
    return res.status(200).json({ contacts });
  } else if (req.method === "DELETE") {
    await connectMongoDB();
    const { id } = req.body;

    try {
      await Contact.findByIdAndDelete(id);
      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Failed to delete contact" });
    }
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
