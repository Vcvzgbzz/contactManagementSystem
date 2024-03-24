export const resetHtmxForHtmxClass = () => {
  //Hack needed to be implimented to reinstatiate the htmx js on the elements
  const elements = [
    ...(document.getElementsByClassName("htmx") as unknown as any),
  ];
  var newScript = document.createElement("script");
  newScript.innerText = `htmx.process(document.body)`;

  if (elements) {
    for (let element of elements as Array<Element>) {
      element.appendChild(newScript);
    }
  }
};
