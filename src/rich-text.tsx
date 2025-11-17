import React from "react";
import "./rich-text.css";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor-kit";
import { SettingsDialog } from "@/components/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { createSlateEditor } from "platejs";
import { BaseEditorKit } from "@/components/editor-base-kit";
import { serializeHtml } from "platejs/static";
import { EditorStatic } from "@/components/ui/editor-static";
import { UploadProvider } from "./context";

type RichTextProps = {
    content?: string;
    readOnly?: boolean;
    exportHtml?: Function;
    customUploadFiles?: any /** Function */;
};

export const RichText: React.FC<RichTextProps> = ({ content = "<p>Hello World!</p>", readOnly = true, exportHtml, customUploadFiles }) => {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: content,
    });

    async function handleExportHtml() {
        const editorStatic = createSlateEditor({
            plugins: BaseEditorKit,
            value: editor.children,
        });

        const editorHtml = await serializeHtml(editorStatic, {
            editorComponent: EditorStatic,
            props: { style: { padding: "0 calc(50% - 350px)", paddingBottom: "" } },
        });

        exportHtml?.(editorHtml);
    }

    return (
        <UploadProvider customUploadFiles={customUploadFiles}>
            <Plate editor={editor} readOnly={readOnly}>
                <EditorContainer>
                    <Editor variant="default" />
                </EditorContainer>

                {!readOnly && (
                    <>
                        <SettingsDialog />
                        <button className="absolute bottom-20 right-4 bg-amber-200 py-2 px-4 rounded-md cursor-pointer" onClick={handleExportHtml}>
                            Save
                        </button>
                    </>
                )}
            </Plate>
        </UploadProvider>
    );
};
