import React from 'react';
import Mouse from '../../components/Mouse/index'
import PaiMeng from './paiMeng/index'

const Index = () => {
    return (
        <React.Fragment>
            <Mouse render={state => (<PaiMeng {...{state}}></PaiMeng>)}></Mouse>
        </React.Fragment>
    )
}
export default Index;