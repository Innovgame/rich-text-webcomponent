import React from "react";
import type { CustomUploadFnParams, UploadedFile } from "./hooks/use-upload-file";

export interface UploadContextType {
    customUploadFiles?: (params: CustomUploadFnParams) => Promise<UploadedFile | UploadedFile[]>;
}

export const UploadContext = React.createContext<UploadContextType>({});

export const UploadProvider: React.FC<{
    children: React.ReactNode;
    customUploadFiles?: (params: CustomUploadFnParams) => Promise<UploadedFile | UploadedFile[]>;
}> = ({ children, customUploadFiles }) => {
    return <UploadContext.Provider value={{ customUploadFiles }}>{children}</UploadContext.Provider>;
};
