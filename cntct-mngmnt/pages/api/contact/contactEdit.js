import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";

export default async function handler(req, res) {
  if (req.method === "POST") {
    return res.status(500);
  } else if (req.method === "GET") {
    try {
      const { query } = req;
      await connectMongoDB();
      const contact = await Contact.findById(query.id);
      if (!contact) {
        return res.status(500);
      }
      return res.status(200)
        .send(`<tr hx-trigger='cancel' class='editing' hx-get="/contact/">
      <td><input name='firstName' value='${contact.firstName}'></td>
      <td><input name='lastName' value='${contact.lastName}'></td>
      <td><input name='email' value='${contact.email}'></td>
      <td><input name='phoneNumber' value='${contact.phoneNumber}'></td>
      <td><input name='city' value='${contact.address.city}'></td>
      <td><input name='state' value='${contact.address.state}'></td>
      <td>
        <button class="btn btn-danger" hx-get="/api/contact/contactCrud?id=${contact.id}&format=true">
          Cancel
        </button>
      </td>
      <td>
        <button class="btn btn-danger" hx-put="/api/contact/contactCrud?id=${contact.id}&format=true" hx-include="closest tr">
          Save
        </button>
      </td>
    </tr>`);
    } catch {}
  } else {
    return res.status(405).end(); // Method Not Allowed
  }
}
