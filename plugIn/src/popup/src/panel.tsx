import React, { ReactElement, useState, useEffect } from "react"
import './panel.less'
const EasyFunc = () => {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>();
    useEffect(() => {
      chrome.tabs.query({
        url: [
          "https://developer.chrome.com/docs/webstore/*",
          "https://developer.chrome.com/docs/extensions/*",
        ]
      }).then(tabInfos => {
        setTabs(tabInfos)
      });
    }, [])
    const trigger = async (tab: chrome.tabs.Tab ) => {
        await chrome.tabs.update(tab.id as number, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
    }
    const createDom = (tab: chrome.tabs.Tab, title: string, pathname: string): ReactElement => {
        return (
          <li key={tab.id}>
            <a onClick={(e) => {trigger(tab)}}>
              <h3 className="title">{title}</h3>
              <p className="pathname">{pathname}</p>
            </a>
          </li>
        )
    }
    const execute = (): ReactElement[] => {
      const collator = new Intl.Collator();
      (tabs as chrome.tabs.Tab[]).sort((a, b) => collator.compare(a.title as string, b.title as string));
      const result: ReactElement[] = [];
      for (const tab of tabs as chrome.tabs.Tab[]) {
        const title = (tab.title as string).split("-")[0].trim();
        const pathname = new URL(tab.url as string).pathname.slice("/docs".length);
        result.push(createDom(tab, title, pathname))
      }
      return result
    }
    const buttonEvent = async () => {
      if (tabs?.length) {
        const tabIds: number[] = tabs.map(({ id }) => id) as number[];
        if (tabIds.length) {
          const group = await chrome.tabs.group({ tabIds });
          await chrome.tabGroups.update(group, { title: "DOCS", collapsed: true });
        }
      }
    }
    return (
        <React.Fragment>
            <h1>Google Dev Docs</h1>
            <button onClick={buttonEvent}>Group Tabs</button>
            <ul>
              {
                tabs?.length ? (
                  execute()
                ) : ''
              }
            </ul>
        </React.Fragment>
    )
}
export default EasyFunc