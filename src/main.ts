import "../lib/entry";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <rich-text-component string-prop="Rekor"></rich-text-component>
  </main>
`;
document.querySelector<HTMLButtonElement>("#counter");
