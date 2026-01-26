import React, { useEffect, useState } from "react"
import { onMessage } from "webext-bridge/background"
import { ChromeEventType } from "root/types"
import { get } from 'lodash-es'
import MyTable from "./Table"
const App = () => {
    const [ currentData, setCurrentData ] = useState<Array<Record<string, any>>>([])
    useEffect(() => {
        onMessage<{
            url : string,
            response: string
        }>(ChromeEventType.GETRequestURL, (bridgeMessage) => {
            const result = JSON.parse(bridgeMessage.data.response)
            setCurrentData(dealLiePinData(result))
        })
    }, [])
    const dealLiePinData = (result: Record<string, any>): Array<Record<string, any>> => {
        const jobCardList = get(result, ['data', 'data', 'jobCardList'], [])
        debugger
        return jobCardList.map((item: Record<string, any>) => {
            const comp = get(item, ['comp'], {})
            const job = get(item, ['job'], {})
            return {
                company: comp.compName,
                compIndustry: comp.compIndustry,
                compScale: comp.compScale,
                dq: job.dq,
            }
        })
    }
    return (
        <div>
            <MyTable data={currentData}/>
        </div>
    )
}

export default App