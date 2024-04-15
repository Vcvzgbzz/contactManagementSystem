import React, { useEffect } from "react";
import htmx from "htmx.org";
import callApi from "../core/callApi";
import { HStack } from "../core/HStack";
import { resetHtmxForHtmxClass } from "../core/resetHtmx";

const ContactSearch = () => {
  const thStyle: React.CSSProperties = {
    borderBottom: "2px solid #dee2e6",
    padding: "1rem",
    textAlign: "center",
  };
  return (
    <div
      className="htmx"
      style={{
        marginBottom: "2rem",
        display: "inline-block",
        alignSelf: "center",
      }}
    >
      <h3>Search Contacts</h3>
      <input
        id="testid"
        className="searchForm"
        type="search"
        name="search"
        placeholder="Begin Typing To Search Users..."
        hx-get={`/api/contact/contactSearch?page=1&size=1`}
        hx-trigger="input changed delay:500ms, search"
        hx-target="#search-results"
        hx-indicator=".htmx-indicator"
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      />
      <table className="table">
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>City</th>
            <th style={thStyle}>State</th>
          </tr>
        </thead>
        <tbody id="search-results"  hx-target="closest tr" hx-swap="outerHTML swap:1s">
          <tr>
            <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
              No results found
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ContactSearch;
