import React from 'react'
import ShadowDom from './index.tsx'
import "./selfDiv.ts";

const Index = () => {
    return (
        <div>
            <div style={{display: 'none'}}>
                <ShadowDom></ShadowDom>
            </div>
        </div>
    )
}

export default Index

