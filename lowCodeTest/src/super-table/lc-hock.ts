import { Component, h } from "vue";

export const highHockComponent = function (comp: Component, handlerAttrs?: (bindAttrs: any)=>{}) {
    return function(userAttrs?: any) {
        return function ({ ...innerAttrs }: any) {
            const mergeAttrs = { ...(innerAttrs || {}),  ...(userAttrs || {}) };
            const bindAttrs = handlerAttrs ? handlerAttrs(mergeAttrs) : mergeAttrs;
            return h(comp, {
                ...bindAttrs
            });
        }
    }
}
