import "../dist/rich-text-webcomponent";
import "../dist/rich-text-webcomponent.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <rich-text-component string-prop="Rekor"></rich-text-component>
  </main>
`;
document.querySelector<HTMLButtonElement>("#counter");
