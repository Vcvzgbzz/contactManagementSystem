import React from "react";
import htmx from "htmx.org";

const ContactSearch = () => {
  return (
    <div>
      <h3>Search Contacts</h3>
      <input
        className="form-control"
        type="search"
        name="search"
        placeholder="Begin Typing To Search Users..."
        hx-post="/api/contact/contactSearch"
        hx-trigger="input changed delay:500ms, search"
        hx-target="#search-results"
        hx-indicator=".htmx-indicator"
      />

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody id="search-results">
          <tr>
            <td colSpan={3}>No results found</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactSearch;
