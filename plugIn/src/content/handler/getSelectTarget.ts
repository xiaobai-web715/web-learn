import { MessageInfo } from "./type"

export const getSelectTargetHandler = (message: MessageInfo<null>, messageResponse?: Function) => {
    messageResponse && messageResponse(
        [
            {
                path: 'test路径展示',
                label: '图片路径'
            }
        ]
    )
}