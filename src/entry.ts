import r2wc from "@r2wc/react-to-web-component";
import { RichText } from "./rich-text";

customElements.define(
    "rich-text-component",
    r2wc(RichText, {
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
            variant: "string",
        },
    })
);
