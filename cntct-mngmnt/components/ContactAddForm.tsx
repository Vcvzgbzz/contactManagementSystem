import { VStack } from "../core/VStack";
import callApi from "../core/callApi";
import { useState, useEffect } from "react";
import { Contact as ContactData } from "../models/contact";

type Props = {
  setContacts: (contacts: ContactData[]) => void;
};
const ContactAddForm = ({ setContacts }: Props) => {
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    callApi<undefined, { contacts: Array<ContactData> }>({
      method: "get",
      url: "/api/contact/contactCrud",
      steps: {
        onSuccess: (data) => {
          setContacts(data.contacts);
        },
      },
    });
  };
  const emptyFormData: ContactData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    email: "",
    dateOfBirth: "",
    notes: "",
    tags: [],
    isFavorite: false,
  };
  const [formData, setFormData] = useState<ContactData>(emptyFormData);

  return (
    <form
      id="contactList"
      hx-post="/api/contact/contactCrud"
      hx-trigger="submit"
      hx-boost
      style={{ padding: "10px", display: "flex" }}
    >
      <VStack spacing={0}>
        <label>
          First Name:
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <br />

        <label>
          Last Name:
          <input
            required
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <br />

        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <br />

        <label>
          Street Address:
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, street: e.target.value },
              })
            }
          />
        </label>
        <br />

        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, city: e.target.value },
              })
            }
          />
        </label>
        <br />

        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, state: e.target.value },
              })
            }
          />
        </label>
        <br />

        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={formData.address.postalCode}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: {
                  ...formData.address,
                  postalCode: e.target.value,
                },
              })
            }
          />
        </label>
        <br />

        <label>
          Country:
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: { ...formData.address, country: e.target.value },
              })
            }
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <br />

        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <br />

        <label>
          Notes:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              })
            }
          />
        </label>
        <br />

        <label>
          Tags (comma-separated):
          <input
            type="text"
            name="tags"
            value={formData.tags.join(",")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(","),
              })
            }
          />
        </label>
        <br />

        <label>
          Is Favorite:
          <input
            type="checkbox"
            name="isFavorite"
            checked={formData.isFavorite}
            onChange={(e) =>
              setFormData({
                ...formData,
                [e.target.name]: e.target.checked,
              })
            }
          />
        </label>

        <br />

        <button type="submit">Add Contact</button>
      </VStack>
    </form>
  );
};
export default ContactAddForm;
