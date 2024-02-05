import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
// import htmx from 'htmx.org';
import { useRouter } from "next/router";

// import styles from './page.module.css';
import callApi from "./api/callApi";
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
  const [contacts, setContacts] = useState<Array<any>>([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  useEffect(() => {
    // Fetch contacts on component mount

    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    callApi<undefined, Array<any>>({
      method: "get",
      url: "/api/contact",
      steps: {
        onSuccess: (data) => {
          setContacts(data);
        },
      },
    });
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    callApi({
      url: "/api/contact",
      steps: {
        onRequest: () => {
          console.log("request");
        },
        onSuccess: (data) => {
          console.log("data", data);
        },
        onFail: (error) => {
          console.log("error", error);
        },
      },
      body: JSON.stringify(formData),
    });

    // Refetch contacts after adding a new one
    fetchContacts();

    // Clear the form
    setFormData({ name: "", email: "", phone: "" });
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
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <br />

        <label>
          Phone:
          <input
            type="text"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </label>
        <br />

        <button type="submit">Add Contact</button>
      </form>

      {/* <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul> */}
    </main>
  );
}
