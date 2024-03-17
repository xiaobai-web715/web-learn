import React from 'react';
import { createRoot } from 'react-dom/client'; //createRoot 在应用启动的时候没有问题,但是在qiankun加载微服务的时候,会导致RouterIndex不执行(网上有个解释说createRoot的改动之一是没有必要把container[容器组件]传递给render了)
import ReactDOM from 'react-dom';
import RouterIndex from 'src/router/index.tsx';
import "src/components/event/index";
import '../../utils/webViewBridge.ts';
import './index.scss';

function render(props) {
    console.log('props', props);
    const { container,  onGlobalStateChange} = props;
    // const root = createRoot(container ? container.querySelector('#root') : document.querySelector('#root'));
    // root.render(<RouterIndex />);
    // console.log('onGlobalStateChange', onGlobalStateChange.path)
    console.log('container', container);
    ReactDOM.render(
        <RouterIndex></RouterIndex>,
        container ? container.querySelector('#root') : document.querySelector('#root')
    );
}
console.log('!window.__POWERED_BY_QIANKUN__', !window.__POWERED_BY_QIANKUN__);
if (!window.__POWERED_BY_QIANKUN__) {
    render({});
}
export async function bootstrap() {
    console.log('[react16] react app bootstraped');
}

export async function mount(props) {
    console.log('[react16] props from main framework', props);
    render(props);
}

export async function unmount(props) {
    console.log('[react16] props from main framework unmount', props);
    const { container } = props;
    ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
