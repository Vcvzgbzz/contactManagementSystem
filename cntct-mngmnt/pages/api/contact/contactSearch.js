import connectMongoDB from "../../../lib/mongodb";
import Contact from "../../../models/contact";
import { callApi } from "../../../core/callApi";


export default async function handler(req, res) {
  if (req.method === "GET") {
    await connectMongoDB();
    const { query } = req;
    const { page, search, size } = query;

    if (!search) {
      return res
        .status(200)
        .send(`<tr><td colSpan="3">No Search Term Found</td></tr>`);
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
    if (page) {
      const adjustedPage = page - 1;
      for (
        let index = size * adjustedPage;
        index < size * adjustedPage + size;
        index++
      ) {
        const atEnd = index === size * adjustedPage + size - 1;
        if (contacts[index] === undefined) {
          break;
        }
        html += `<tr ${
          atEnd
            ? `hx-get="/api/contact/contactSearch?page=${
                parseInt(page) + 1
              }&search=${search}&size=${size}"
        hx-trigger="revealed"
        hx-swap="afterend"`
            : ""
        }>
        <td>${contacts[index].firstName}</td>
        <td>${contacts[index].lastName}</td>
        <td>${contacts[index].email}</td>
        <td>${contacts[index].phoneNumber}</td>
        <td>${contacts[index].address.city}</td>
        <td>
        ${contacts[index].address.state}
        </td>
        <td><button hx-delete="/api/contact/contactCrud?id=${contacts[index].id}">Delete</button></td>
       
      </tr>`;
      }
    } else {
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
    }
    if (contacts.length === 0) {
      html = `<tr><td colSpan="3">No results found</td></tr>`;
    }

    return res.status(200).send(html);
  } else {
    return res.status(405).end();
  }
}
