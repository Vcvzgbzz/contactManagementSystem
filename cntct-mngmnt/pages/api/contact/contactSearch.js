import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectMongoDB();
    const { body } = req;
    const { search } = body;

    if (!search) {
      return res
        .status(200)
        .send(`<tr><td colSpan="3">No results found</td></tr>`);
    }

    const contacts = await Contact.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ],
    });

    let html = "";
    contacts.forEach((contact) => {
      html += `<tr>
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.email}</td>
        <td>${contact.phoneNumber}</td>
        <td>${contact.address.city}</td>
        <td>${contact.address.state}</td>
      </tr>`;
    });

    if (contacts.length === 0) {
      html = `<tr><td colSpan="3">No results found</td></tr>`;
    }

    return res.status(200).send(html);
  } else {
    return res.status(405).end();
  }
}
