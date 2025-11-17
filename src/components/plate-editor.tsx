"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor-kit";
import { SettingsDialog } from "@/components/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { createSlateEditor } from "platejs";
import { BaseEditorKit } from "./editor-base-kit";
import { serializeHtml } from "platejs/static";
import { EditorStatic } from "./ui/editor-static";

interface PlateEditorProps {
    readOnly?: boolean;
    value?: string;
    exportHtml?: Function;
}

export function PlateEditorComponent({ readOnly = false, value: propValue, exportHtml }: PlateEditorProps) {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: propValue,
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
        <Plate editor={editor} readOnly={readOnly}>
            <EditorContainer>
                <Editor variant="demo" />
            </EditorContainer>

            <SettingsDialog />

            <button className="absolute bottom-20 right-4 bg-amber-200 py-2 px-4 rounded-md cursor-pointer" onClick={handleExportHtml}>
                Save
            </button>
        </Plate>
    );
}
