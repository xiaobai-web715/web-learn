import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/view/store"
import App from './app'
console.log("我被找到了吗")
const root = createRoot(document.querySelector<Element>('#app') as Element)
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
)
