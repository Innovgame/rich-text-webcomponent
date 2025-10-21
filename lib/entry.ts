import r2wc from "@r2wc/react-to-web-component";
import { RichText } from "./rich-text";

const RichTextComponent = r2wc(RichText, {
    props: {
        stringProp: "string",
        // numProp: "number",
        // floatProp: "number",
        // trueProp: "boolean",
        // falseProp: "boolean",
        // arrayProp: "json",
        // objProp: "json",
        // funcProp: "function",
    },
});

customElements.define("rich-text-component", RichTextComponent);
