import { useEffect } from "react";
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
import { content } from "@/components/demo";

// 事件名称常量
const EVENTS = {
    REQUEST_EXPORT: 'request-export-html',
    RESPONSE_EXPORT: 'response-export-html',
};

type RichTextProps = {
    variant?: "ai" | "aiChat" | "comment" | "none" | "default" | "select" | "demo" | "fullWidth" | null | undefined;
    content?: string;
    readOnly?: boolean;
    customUploadFiles?: any /** Function */;
};

export const RichText = ({ readOnly = true, customUploadFiles, variant = "default" }: RichTextProps) => {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: content,
    });

    async function exportHtml() {
        const editorStatic = createSlateEditor({
            plugins: BaseEditorKit,
            value: editor.children,
        });

        const editorHtml = await serializeHtml(editorStatic, {
            editorComponent: EditorStatic,
            props: { style: { padding: "0 calc(50% - 350px)", paddingBottom: "" } },
        });

        return editorHtml;
    }

    // 监听来自 Web Component 的导出请求
    useEffect(() => {
        const handleExportRequest = async (event: Event) => {
            const customEvent = event as CustomEvent;
            const { requestId } = customEvent.detail;

            try {
                const html = await exportHtml();
                // 发送响应事件
                const responseEvent = new CustomEvent(EVENTS.RESPONSE_EXPORT, {
                    detail: { requestId, html },
                    bubbles: true,
                    composed: true,
                });
                document.dispatchEvent(responseEvent);
            } catch (error: any) {
                // 发送错误响应事件
                const errorEvent = new CustomEvent(EVENTS.RESPONSE_EXPORT, {
                    detail: { requestId, error: error.message },
                    bubbles: true,
                    composed: true,
                });
                document.dispatchEvent(errorEvent);
            }
        };

        document.addEventListener(EVENTS.REQUEST_EXPORT, handleExportRequest);
        return () => {
            document.removeEventListener(EVENTS.REQUEST_EXPORT, handleExportRequest);
        };
    }, []);

    return (
        <UploadProvider customUploadFiles={customUploadFiles}>
            <Plate editor={editor} readOnly={readOnly}>
                <EditorContainer>
                    <Editor variant={variant} />
                </EditorContainer>

                {!readOnly && (
                    <>
                        <SettingsDialog />
                        {/* <div className="absolute bottom-20 right-4 bg-amber-200 py-2 px-4 rounded-md cursor-pointer" onClick={exportHtml}>
                            Save
                        </div> */}
                    </>
                )}
            </Plate>
        </UploadProvider>
    );
};
