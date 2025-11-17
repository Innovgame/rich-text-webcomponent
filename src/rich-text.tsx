import React from "react";
import "./rich-text.css";
import { PlateEditorComponent } from "@/components/plate-editor";

type RichTextProps = {
    content?: string;
    readOnly?: boolean;
};

export const RichText: React.FC<RichTextProps> = ({ content = "<p>Hello World!</p>", readOnly = true }) => {
    return <PlateEditorComponent value={content} readOnly={readOnly}></PlateEditorComponent>;
};
