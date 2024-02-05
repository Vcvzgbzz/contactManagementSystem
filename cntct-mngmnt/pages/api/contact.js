import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  console.log("handler");
  try {
    const { db } = await clientPromise();
    console.log(db, "here");

    if (req.method === "GET") {
      const contacts = await db.collection("contacts").find({}).toArray();
      res.status(200).json(contacts);
    } else if (req.method === "POST") {
      const { name, email, phone } = req.body;
      await db.collection("contacts").insertOne({ name, email, phone });
      res.status(201).json({ message: "Contact added successfully" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
