import React from "react";
import "./rich-text.css";
import { PlateEditorComponent } from "@/components/plate-editor";

type RichTextProps = {
    content?: string;
    readOnly?: boolean;
    exportHtml?: Function;
};

export const RichText: React.FC<RichTextProps> = ({ content = "<p>Hello World!</p>", readOnly = true, exportHtml }) => {
    return <PlateEditorComponent value={content} readOnly={readOnly} exportHtml={exportHtml}></PlateEditorComponent>;
};
