export enum ChromeEventType {
    TRIGGER_ACTION = "trigger-action"
}

export const chromeEvent = {
    [ChromeEventType.TRIGGER_ACTION]: () => {}
}
