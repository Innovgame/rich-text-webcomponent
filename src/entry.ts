import r2wc from "@r2wc/react-to-web-component";
import { RichText } from "./rich-text";

const RichTextWebComponent = r2wc(RichText, {
    props: {
        // stringProp: "string",
        // numProp: "number",
        // floatProp: "number",
        // trueProp: "boolean",
        // falseProp: "boolean",
        // arrayProp: "json",
        // objProp: "json",
        customUploadFiles: "method",
        exportHtml: "method",
        readOnly: "boolean",
        content: "string",
    },
});

customElements.define("rich-text-component", RichTextWebComponent);
