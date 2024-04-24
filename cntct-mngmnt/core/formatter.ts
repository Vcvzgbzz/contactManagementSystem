import { Contact } from "../models/contact";

export const formatJsonToTable = (contact: Contact) => {
  return `
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${contact.email}</td>
      <td>${contact.phoneNumber}</td>
      <td>${contact.address.city}</td>
      <td>
      ${contact.address.state}
      </td>
      <td><button hx-delete="/api/contact/contactCrud?id=${
        //@ts-ignore
        contact.id
      }">Delete</button></td>
      <td>
      <button class="btn btn-danger"
              hx-get="/api/contact/contactEdit?id=${
                //@ts-ignore
                contact.id
              }"
              hx-trigger="edit"
              onClick="let editing = document.querySelector('.editing')
                       if(editing) {
                         Swal.fire({title: 'Already Editing',
                                    showCancelButton: true,
                                    confirmButtonText: 'Yep, Edit This Row!',
                                    text:'Hey!  You are already editing a row!  Do you want to cancel that edit and continue?'})
                         .then((result) => {
                              if(result.isConfirmed) {
                                 htmx.trigger(editing, 'cancel')
                                 htmx.trigger(this, 'edit')
                              }
                          })
                       } else {
                          htmx.trigger(this, 'edit')
                       }">
        Edit
      </button>
      </td>
     `;
};

export const formatFlatContact = (contact: any) => {
  const formattedContact = {
    firstName: contact.firstName,
    lastName: contact.lastName,
    phoneNumber: contact.phoneNumber,
    address: {
      city: contact.city,
      state: contact.state,
      postalCode: contact.postalCode,
      country: contact.country,
    },

    email: contact.email,
    dateOfBirth: contact.dateOfBirth,
    notes: contact.notes,
    tags: contact.tags,
  };
  return formattedContact;
};
