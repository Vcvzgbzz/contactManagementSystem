import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Contact as ContactData } from "../models/contact";
import callApi from "../core/callApi";
import { VStack } from "../core/VStack";
import ContactSearch from "../components/SearchContact";
import Header from "../components/Header";
import { HStack } from "../core/HStack";
import JsonViewer from "../components/JsonViewer";
import ContactAddForm from "../components/ContactAddForm";
import TabBar from "../components/TabBar";
import { resetHtmxForHtmxClass } from "../core/resetHtmx";
import { useRouter } from "next/router";

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
  const [contacts, setContacts] = useState<Array<ContactData>>([]);

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    "Add Contact Page",
    "Search Contacts",
    "View Database Json",
    "Generate Random Contact",
  ];
  useEffect(() => {
    resetHtmxForHtmxClass();
  }, [selectedTab]);

  return (
    <main className={""}>
      <Header />
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <VStack spacing={2}>
        <br />
        <div style={{ width: "100%" }} className="Content">
          {selectedTab === 0 && (
            <div>
              <ContactAddForm setContacts={setContacts}></ContactAddForm>
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <ContactSearch></ContactSearch>
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <VStack>
                <h2>View All Json: Contacts</h2>

                {contacts ? (
                  <JsonViewer object={contacts}></JsonViewer>
                ) : (
                  <div>No results</div>
                )}
              </VStack>
            </div>
          )}
          {selectedTab === 3 && (
            <VStack>
              <form
                className="htmx"
                id="contactList"
                hx-post="/api/contact/contactCrud"
                hx-trigger="submit"
                hx-boost
                style={{ padding: "10px", display: "flex" }}
              >
                <VStack spacing={0}>
                  <label>
                    First Name:
                    <input type="text" name="firstName" value="John" />
                  </label>
                  <br />

                  <label>
                    Last Name:
                    <input required type="text" name="lastName" value="Doe" />
                  </label>
                  <br />

                  <label>
                    Phone Number:
                    <input type="text" name="phoneNumber" value={Date.now()} />
                  </label>
                  <br />

                  <label>
                    Street Address:
                    <input type="text" name="street" value="random" />
                  </label>
                  <br />

                  <label>
                    City:
                    <input type="text" name="city" value="random" />
                  </label>
                  <br />

                  <label>
                    State:
                    <input type="text" name="state" value="random" />
                  </label>
                  <br />

                  <label>
                    Postal Code:
                    <input type="text" name="postalCode" value="random" />
                  </label>
                  <br />

                  <label>
                    Country:
                    <input type="text" name="country" value="random" />
                  </label>
                  <br />

                  <label>
                    Email:
                    <input type="email" name="email" value="random@gmail.com" />
                  </label>
                  <br />

                  <label>
                    Date of Birth:
                    <input type="date" name="dateOfBirth" value={Date.now()} />
                  </label>
                  <br />

                  <label>
                    Notes:
                    <textarea name="notes">random</textarea>
                  </label>
                  <br />

                  <label>
                    Tags (comma-separated):
                    <input type="text" name="tags" value="random" />
                  </label>
                  <br />

                  <label>
                    Is Favorite:
                    <input type="checkbox" name="isFavorite" checked={false} />
                  </label>
                  <br />
                </VStack>
                <button type="submit">Add Contact</button>
              </form>
            </VStack>
          )}
        </div>
      </VStack>
    </main>
  );
}
