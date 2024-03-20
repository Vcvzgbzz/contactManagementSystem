function objectMapper(object) {
  return object !== null && object !== undefined ? (
    Object.entries(object).map((objectItem, index) => {
      return (
        <>
          <li key={index}>
            {objectItem[0]}:{" "}
            {typeof objectItem[1] === "object" && objectItem[1] !== null ? (
              <ul>{objectMapper(objectItem[1])}</ul>
            ) : (
              objectItem[1]
            )}
          </li>
        </>
      );
    })
  ) : (
    <li>null</li>
  );
}

export default function JsonViewer({ object }) {
  return <ul>{objectMapper(object)}</ul>;
}
