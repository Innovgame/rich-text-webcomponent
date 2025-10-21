import "../lib/entry";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <rich-text-component string-prop="Rekor"></rich-text-component>
  </div>
`;
document.querySelector<HTMLButtonElement>("#counter");
