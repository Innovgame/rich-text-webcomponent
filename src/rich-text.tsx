import React from "react";
import "./rich-text.css";
import { Plate, usePlateEditor } from "platejs/react";
import { Editor, EditorContainer } from "@/components/ui/editor";

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
    const editor = usePlateEditor(); // 初始化编辑器实例

    return (
        <Plate editor={editor}>
            {" "}
            {/* 提供编辑器上下文 */}
            <EditorContainer>
                {" "}
                {/* 设置编辑器区域样式 */}
                <Editor placeholder="输入您精彩的内容..." />
            </EditorContainer>
        </Plate>
    );
};
