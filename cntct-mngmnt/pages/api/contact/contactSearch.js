import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectMongoDB();
    const { body } = req;
    const { searchTerm } = body;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const contacts = await Contact.find({
      $or: [
        { firstName: { $regex: searchTerm, $options: "i" } },
        { lastName: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ],
    });

    return res.status(200).json({ contacts });
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
