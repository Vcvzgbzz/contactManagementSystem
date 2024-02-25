import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post request");
    const contact = req.body;
    await connectMongoDB();
    await Contact.create(contact);
    return res.status(201).json({ message: "Contact created" });
  } else if (req.method === "GET") {
    await connectMongoDB();
    const contacts = await Contact.find();
    return res.status(200).json({ contacts });
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
