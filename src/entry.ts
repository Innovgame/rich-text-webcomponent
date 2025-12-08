import r2wc from "@r2wc/react-to-web-component";
import { RichText } from "./rich-text";
import "./type"; // 确保类型声明被包含在构建中

// 事件名称常量
const EVENTS = {
    REQUEST_EXPORT: "request-export-html",
    RESPONSE_EXPORT: "response-export-html",
};

const RichTextComponent = r2wc(RichText, {
    props: {
        customUploadFiles: "method",
        readOnly: "boolean",
        content: "string",
        variant: "string",
    },
});

// 重写 connectedCallback：当 Web Component 被添加到 DOM 时，暴露方法
const originalConnectedCallback = RichTextComponent.prototype.connectedCallback;
RichTextComponent.prototype.connectedCallback = function () {
    originalConnectedCallback.call(this);

    // 暴露 exportHtml 方法（使用事件通信）
    this.exportHtml = () => {
        return new Promise((resolve, reject) => {
            const requestId = Math.random().toString(36).substring(7);

            // 监听响应事件
            const handleResponse = (event: Event) => {
                const customEvent = event as CustomEvent;
                const { requestId: responseId, html, error } = customEvent.detail;

                if (responseId === requestId) {
                    clearTimeout(timeoutId);
                    document.removeEventListener("response-export-html", handleResponse);

                    if (error) {
                        reject(new Error(error));
                    } else {
                        resolve(html);
                    }
                }
            };

            const timeoutId = setTimeout(() => {
                document.removeEventListener(EVENTS.RESPONSE_EXPORT, handleResponse);
                reject(new Error("Export timeout"));
            }, 5000); // 5秒超时

            document.addEventListener(EVENTS.RESPONSE_EXPORT, handleResponse);

            // 等待一段时间确保 React 组件已经准备好
            setTimeout(() => {
                // 发送导出请求事件
                const requestEvent = new CustomEvent(EVENTS.REQUEST_EXPORT, {
                    detail: { requestId },
                    bubbles: true,
                    composed: true,
                });
                document.dispatchEvent(requestEvent);
            }, 100);
        });
    };
};

customElements.define("rich-text-webcomponent", RichTextComponent);

export * from "./type";
