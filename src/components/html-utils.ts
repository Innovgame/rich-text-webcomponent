import { getEditorDOMFromHtmlString } from "platejs/static";

/**
 * 将HTML字符串转换为Plate节点格式
 * 注意：此函数需要在编辑器上下文中使用，因为它依赖editor的API进行转换
 *
 * @param html HTML字符串
 * @param editor Plate编辑器实例
 * @returns Plate节点数组
 */
export const htmlToPlateNodes = (html: string, editor: any) => {
    try {
        const editorNode = getEditorDOMFromHtmlString(html);
        const nodes = editor.api.html.deserialize({ element: editorNode });
        return nodes;
    } catch (error) {
        console.error('HTML转换失败:', error);
        throw error;
    }
};

/**
 * 客户端HTML转换示例
 * 在组件内使用时：
 */
export const exampleClientSideConversion = () => {
    // 这是使用示例，在React组件中：
    /*
    function MyComponent({ htmlContent }) {
        const editor = usePlateEditor({ plugins: EditorKit });
        const [plateNodes, setPlateNodes] = React.useState([]);

        React.useEffect(() => {
            if (typeof htmlContent === 'string' && htmlContent.startsWith('<')) {
                const nodes = htmlToPlateNodes(htmlContent, editor);
                setPlateNodes(nodes);
            }
        }, [htmlContent, editor]);

        return <RichText value={plateNodes} readOnly={true} />;
    }
    */
};