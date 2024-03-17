import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { Contact as ContactData } from "../models/contact";
import Script from "next/script";
import callApi from "../core/callApi";
import { VStack } from "../core/VStack";
import ContactSearch from "../components/SearchContact";
import Header from "../components/Header";
import { HStack } from "../core/HStack";
import JsonViewer from "../components/JsonViewer";
import ContactAddForm from "../components/ContactAddForm";
import TabBar from "../components/TabBar";

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
  const tabs = ["Add Contact Page", "Search Contacts", "View Database Json"];

  return (
    <main className={""}>
      <Script src="https://cdn.jsdelivr.net/npm/htmx.org/dist/htmx.min.js" />
      <Header></Header>
      <TabBar
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <VStack spacing={2}>
        <br />
        <div>
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
                <h2>test</h2>
                
                  {contacts ? (
                    <JsonViewer object={contacts}></JsonViewer>
                  ) : (
                    <div>No results</div>
                  )}
                
              </VStack>
            </div>
          )}
        </div>
      </VStack>
    </main>
  );
}
