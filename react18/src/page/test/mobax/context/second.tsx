import React from 'react';
import { useOtherStore } from 'src/context';
import { observer } from 'mobx-react-lite';
const Second = observer(() => {
    const otherStore = useOtherStore();
    return (
        <div>我是状态的值{otherStore.count}</div>
    );
});

export default Second;