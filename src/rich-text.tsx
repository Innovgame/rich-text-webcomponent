import React from "react";
import "./rich-text.css";
import { PlateEditor } from "@/components/plate-editor";

type RichTextProps = {
    // stringProp: string;
    // numProp: number;
    // floatProp: number;
    // trueProp: boolean;
    // falseProp: boolean;
    // arrayProp: any[];
    // objProp: Record<string, any>;
    // funcProp: (name: string) => void;
};

export const RichText: React.FC<RichTextProps> = ({}) => {
    return <PlateEditor></PlateEditor>;
};
