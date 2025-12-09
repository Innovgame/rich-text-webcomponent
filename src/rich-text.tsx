import { useCallback, useEffect, useRef } from "react";
import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@/components/editor-kit";
import { SettingsDialog } from "@/components/settings-dialog";
import { Editor, EditorContainer } from "@/components/ui/editor";
import { createSlateEditor } from "platejs";
import { serializeHtml } from "platejs/static";
import { EditorStatic } from "@/components/ui/editor-static";
import { BaseEditorKit } from "@/components/editor-base-kit";
import { UploadProvider } from "./context";

type RichTextProps = {
    variant?: "ai" | "aiChat" | "none" | "default" | "select" | "demo" | "fullWidth" | null | undefined;
    content?: string;
    readOnly?: boolean;
    customUploadFiles?: any /** Function */;
    exportHtml?: (fn: () => Promise<string>) => void /** Function */;
};

export const RichText: React.FC<RichTextProps> = ({
    content = "<p>Hello World!</p>",
    readOnly = true,
    customUploadFiles,
    variant = "default",
    exportHtml,
}) => {
    const editor = usePlateEditor({
        plugins: EditorKit,
        value: content,
    });

    // 使用 useRef 跟踪 content 的变化
    const contentRef = useRef(content);

    // 监听 content 变化并更新编辑器
    useEffect(() => {
        if (content !== contentRef.current) {
            contentRef.current = content;
            // 使用正确的 Plate API 更新编辑器
            try {
                // console.log("content change: ", contentRef.current);
                // 创建一个临时编辑器来解析HTML字符串
                const tempEditor = createSlateEditor({
                    plugins: EditorKit,
                    value: content,
                });

                // 获取解析后的节点并更新主编辑器
                editor.tf.replaceNodes(tempEditor.children, {
                    at: [],
                    children: true,
                });
            } catch (error) {
                console.warn("rich-text-component Failed to update editor content:", error);
            }
        }
    }, [content, editor]);

    // 实际的 exportHtml 实现
    const exportHtmlImpl = useCallback(async () => {
        try {
            const editorStatic = createSlateEditor({
                plugins: BaseEditorKit,
                value: editor.children,
            });

            const editorHtml = await serializeHtml(editorStatic, {
                editorComponent: EditorStatic,
                props: { variant: variant, style: { paddingBottom: "" } },
            });
            return editorHtml;
        } catch (error) {
            console.warn("rich-text-component Failed to export html string:", error);
            return "";
        }
    }, [editor, variant]);

    // 在组件挂载时暴露方法给 props.exportHtml
    useEffect(() => {
        if (exportHtml) exportHtml(exportHtmlImpl);
    }, [exportHtml, exportHtmlImpl]);

    return (
        <UploadProvider customUploadFiles={customUploadFiles}>
            <Plate editor={editor} readOnly={readOnly}>
                <EditorContainer>
                    <Editor variant={variant} />
                </EditorContainer>
                {!readOnly && <SettingsDialog />}
            </Plate>
        </UploadProvider>
    );
};
