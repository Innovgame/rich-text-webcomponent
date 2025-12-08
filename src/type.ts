// 富文本 Web Component 类型声明

export interface RichTextWebComponent extends HTMLElement {
    /**
     * 导出当前编辑器内容为 HTML 字符串
     * @returns Promise<string> 导出的 HTML 字符串
     */
    exportHtml(): Promise<string>;

    /**
     * 自定义文件上传函数（可选）
     * @param params 上传参数
     * @returns any 上传结果
     */
    customUploadFiles?: (params: any) => any;

    /**
     * 是否只读模式
     */
    readOnly?: boolean;

    /**
     * 编辑器初始内容（HTML 字符串）
     */
    content?: string;

    /**
     * 编辑器变体
     */
    variant?: string;
}

declare global {
    interface HTMLElementTagNameMap {
        "rich-text-webcomponent": RichTextWebComponent;
    }
}
