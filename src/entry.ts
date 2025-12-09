import r2wc from "@r2wc/react-to-web-component";
import { RichText } from "./rich-text";
import "./rich-text.css";
import "./type"; // 确保类型声明被包含在构建中

const RichTextComponent = r2wc(RichText, {
    props: {
        customUploadFiles: "method",
        readOnly: "boolean",
        content: "string",
        variant: "string",
        exportHtml: "method",
    },
});

customElements.define("rich-text-webcomponent", RichTextComponent);

export * from "./type";
