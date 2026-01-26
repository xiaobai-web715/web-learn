import React, { useEffect, useState } from "react"
import { onMessage } from "webext-bridge/background"
import { ChromeEventType } from "root/types"
const App = () => {
    const [ currentUrl, setCurrentUrl ] = useState<string>('')
    useEffect(() => {
        onMessage<{url : string}>(ChromeEventType.GETRequestURL, (data) => {
            console.log('getRequestUrl', data)
            setCurrentUrl(data.data?.url)
        })
    }, [])
    return (
        <div>
            { currentUrl }
        </div>
    )
}

export default App