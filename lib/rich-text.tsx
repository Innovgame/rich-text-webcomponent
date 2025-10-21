import React from "react";

type RichTextProps = {
    stringProp: string;
    // numProp: number;
    // floatProp: number;
    // trueProp: boolean;
    // falseProp: boolean;
    // arrayProp: any[];
    // objProp: Record<string, any>;
    // funcProp: (name: string) => void;
};

export const RichText: React.FC<RichTextProps> = ({ stringProp }) => {
    return <div>Hello Web Commponent {stringProp}.</div>;
};
