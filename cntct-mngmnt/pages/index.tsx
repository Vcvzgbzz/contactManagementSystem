import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
// import htmx from 'htmx.org';
import { useRouter } from "next/router";

// import styles from './page.module.css';
import callApi from "../core/callApi";
// import { connectToDatabase } from '@/app/mongodb';

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  type ContactData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    email: string;
    dateOfBirth: string;
    notes: string;
    tags: string[];
    isFavorite: boolean;
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
  const [contacts, setContacts] = useState<Array<ContactData>>([]);
  const [formData, setFormData] = useState<ContactData>(emptyFormData);
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    callApi<undefined, {contacts:Array<ContactData>}>({
      method: "get",
      url: "/api/contactApi",
      steps: {
        onSuccess: (data) => {
          console.log(data.contacts)
          setContacts(data.contacts);
        },
      },
    });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    callApi({
      method: "post",
      url: "/api/contactApi",
      steps: {
        onRequest: () => {},
        onSuccess: (data) => {
          console.log("data", data);
        },
        onFail: (error) => {
          console.log("error", error);
        },
      },
      body: formData,
    });

    // Refetch contacts after adding a new one
    fetchContacts();

    // Clear the form
    setFormData(emptyFormData);
  };
  return (
    <main className={""}>
      <h1>Contact Management System</h1>

      <form
        onSubmit={(event) => {
          console.log(event);
          handleFormSubmit(event);
        }}
      >
        <label>
          First Name:
          <input
            required
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
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
              setFormData({ ...formData, [e.target.name]: e.target.value })
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
              setFormData({ ...formData, [e.target.name]: e.target.value })
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
                address: { ...formData.address, postalCode: e.target.value },
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
              setFormData({ ...formData, [e.target.name]: e.target.value })
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
              setFormData({ ...formData, [e.target.name]: e.target.value })
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
              setFormData({ ...formData, [e.target.name]: e.target.value })
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
              setFormData({ ...formData, tags: e.target.value.split(",") })
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
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }
          />
        </label>

        <br />

        <button type="submit">Add Contact</button>
      </form>
      {contacts && contacts.map((contact,index) => (
  <li key={index}>
    <div>
      {contact.firstName} - {contact.email} - {contact.phoneNumber}
    </div>
  </li>
))}

    </main>
  );
}
