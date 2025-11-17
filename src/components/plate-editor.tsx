"use client";

import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor-kit";
import { SettingsDialog } from "@/components/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";

interface PlateEditorProps {
    readOnly?: boolean;
    value?: string;
}

export function PlateEditorComponent({ readOnly = false, value: propValue }: PlateEditorProps) {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: propValue,
    });

    return (
        <Plate editor={editor} readOnly={readOnly}>
            <EditorContainer>
                <Editor variant="demo" />
            </EditorContainer>

            <SettingsDialog />
        </Plate>
    );
}
