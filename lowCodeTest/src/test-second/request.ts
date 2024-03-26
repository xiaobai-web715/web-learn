const tableData = [
    {
        "id": 1, //客户标识id
        "name": "易点云", //客户名称
        "statusName": "已成单", //客户状态名称
        "positionType": 1, //位置类型 1：公海 2：我的私海 3：他人私海 4：不在crm中
        "positionName": "他人私海", //位置
        "returnPhaseDesc": "确认商机", //回归前客户阶段
        "callNum": 10, //通话次数
        "returnTime": "yyyy-MM-dd HH:mm:ss", //上次回归公海时间
        "regressionReason": "回归公海原因", //回归公海原因
        "businessStatusDesc": "在营", //营业状态
        "leftDayDesc": "回归剩余天数描述", //回归剩余天数描述
        "isInHundred": 1, //是否是百城 1：是
        "isGroup": 1, //0:独立账户 1:集团账户
        "createdTime": "yyyy-MM-dd HH:mm:ss", //创建时间
        "isCollect": true, //是否收藏 true 已收藏 false 没有收藏
        "isDisplay": true, //是否可以认领
        "jumpFlag": 1, //跳转客户详情标识 1跳转私海 2 跳转公海 0 不能跳
        "claimIsGray": 1, //认领按钮是否置灰（0：不置灰、1：置灰）
        "labelSummaryList": [
            {
                "id": 2, //id
                "labelType": 100, //标签类型
                "labelName": "大型公司", //标签名称
                "labelShowType": 1 //标签展示标识 1高亮
            } //客户标签信息
        ],
        "contactInfoList": [
            {
                "id": 2, //联系人id
                "name": "张先生", //联系人名称
                "contactPhoneInfoList": [
                    {
                        "id": 2111, //号码id
                        "phone": "10086", //联系人号码
                        "lastCallTime": "yyyy-MM-dd HH:mm:ss", //最近拨打时间
                        "lastCallDuration": 120, //最近拨打时长(秒)
                        "lastSaleRecord": "最近销售记录", //最近销售记录
                        "lastCallFile": "crm/call/file/xxx.mp3", //最近通话录音
                        "phoneCheck": 2, //验证状态标签 1：已验证 2：错误号码
                        "phoneQuality": 11, //验证KP标签 批次10、11是验证Kp标签，其他批次是优质号码标签
                        "onlineStatus": 2, //空号状态 0：空号
                        "repeatStatus": 1, //禁止拨打标签（手机号是否在 t_contact_feedback）1：禁止拨打
                        "identify": {
                            "wrongStyleType": 1, //错号 1：绿色 2：黄色 3：红色 4：灰色
                            "wrongScore": 80, //错号分
                            "rejectStyleType": 2, //拒绝 1：绿色 2：黄色 3：红色 4：灰色
                            "rejectScore": 90 //拒绝分
                        } //错号分和拒绝分
                    },
                    {
                        "id": 2112, //号码id
                        "phone": "10086", //联系人号码
                        "lastCallTime": "yyyy-MM-dd HH:mm:ss", //最近拨打时间
                        "lastCallDuration": 120, //最近拨打时长(秒)
                        "lastSaleRecord": "最近销售记录", //最近销售记录
                        "lastCallFile": "crm/call/file/xxx.mp3", //最近通话录音
                        "phoneCheck": 2, //验证状态标签 1：已验证 2：错误号码
                        "phoneQuality": 11, //验证KP标签 批次10、11是验证Kp标签，其他批次是优质号码标签
                        "onlineStatus": 2, //空号状态 0：空号
                        "repeatStatus": 1, //禁止拨打标签（手机号是否在 t_contact_feedback）1：禁止拨打
                        "identify": {
                            "wrongStyleType": 1, //错号 1：绿色 2：黄色 3：红色 4：灰色
                            "wrongScore": 80, //错号分
                            "rejectStyleType": 2, //拒绝 1：绿色 2：黄色 3：红色 4：灰色
                            "rejectScore": 90 //拒绝分
                        } //错号分和拒绝分
                    }
                ] //联系方式信息
            } //联系人信息
        ]
    },
    {
        "id": 2, //客户标识id
        "name": "易点云2", //客户名称
        "statusName": "已成单2", //客户状态名称
        "positionType": 1, //位置类型 1：公海 2：我的私海 3：他人私海 4：不在crm中
        "positionName": "他人私海", //位置
        "returnPhaseDesc": "确认商机", //回归前客户阶段
        "callNum": 10, //通话次数
        "returnTime": "yyyy-MM-dd HH:mm:ss", //上次回归公海时间
        "regressionReason": "回归公海原因", //回归公海原因
        "businessStatusDesc": "在营", //营业状态
        "leftDayDesc": "回归剩余天数描述", //回归剩余天数描述
        "isInHundred": 1, //是否是百城 1：是
        "isGroup": 1, //0:独立账户 1:集团账户
        "createdTime": "yyyy-MM-dd HH:mm:ss", //创建时间
        "isCollect": true, //是否收藏 true 已收藏 false 没有收藏
        "isDisplay": true, //是否可以认领
        "jumpFlag": 1, //跳转客户详情标识 1跳转私海 2 跳转公海 0 不能跳
        "claimIsGray": 1, //认领按钮是否置灰（0：不置灰、1：置灰）
        "labelSummaryList": [
            {
                "id": 2, //id
                "labelType": 100, //标签类型
                "labelName": "大型公司", //标签名称
                "labelShowType": 1 //标签展示标识 1高亮
            } //客户标签信息
        ],
        "contactInfoList": [
            {
                "id": 22, //联系人id
                "name": "张先生", //联系人名称
                "contactPhoneInfoList": [
                    {
                        "id": 22111, //号码id
                        "phone": "10086", //联系人号码
                        "lastCallTime": "yyyy-MM-dd HH:mm:ss", //最近拨打时间
                        "lastCallDuration": 120, //最近拨打时长(秒)
                        "lastSaleRecord": "最近销售记录", //最近销售记录
                        "lastCallFile": "crm/call/file/xxx.mp3", //最近通话录音
                        "phoneCheck": 2, //验证状态标签 1：已验证 2：错误号码
                        "phoneQuality": 11, //验证KP标签 批次10、11是验证Kp标签，其他批次是优质号码标签
                        "onlineStatus": 2, //空号状态 0：空号
                        "repeatStatus": 1, //禁止拨打标签（手机号是否在 t_contact_feedback）1：禁止拨打
                        "identify": {
                            "wrongStyleType": 1, //错号 1：绿色 2：黄色 3：红色 4：灰色
                            "wrongScore": 80, //错号分
                            "rejectStyleType": 2, //拒绝 1：绿色 2：黄色 3：红色 4：灰色
                            "rejectScore": 90 //拒绝分
                        } //错号分和拒绝分
                    },
                    {
                        "id": 22112, //号码id
                        "phone": "10086", //联系人号码
                        "lastCallTime": "yyyy-MM-dd HH:mm:ss", //最近拨打时间
                        "lastCallDuration": 120, //最近拨打时长(秒)
                        "lastSaleRecord": "最近销售记录", //最近销售记录
                        "lastCallFile": "crm/call/file/xxx.mp3", //最近通话录音
                        "phoneCheck": 2, //验证状态标签 1：已验证 2：错误号码
                        "phoneQuality": 11, //验证KP标签 批次10、11是验证Kp标签，其他批次是优质号码标签
                        "onlineStatus": 2, //空号状态 0：空号
                        "repeatStatus": 1, //禁止拨打标签（手机号是否在 t_contact_feedback）1：禁止拨打
                        "identify": {
                            "wrongStyleType": 1, //错号 1：绿色 2：黄色 3：红色 4：灰色
                            "wrongScore": 80, //错号分
                            "rejectStyleType": 2, //拒绝 1：绿色 2：黄色 3：红色 4：灰色
                            "rejectScore": 90 //拒绝分
                        } //错号分和拒绝分
                    }
                ] //联系方式信息
            } //联系人信息
        ]
    },
    {
        "id": 3, //客户标识id
        "name": "易点云3", //客户名称
        "statusName": "已成单", //客户状态名称
        "positionType": 1, //位置类型 1：公海 2：我的私海 3：他人私海 4：不在crm中
        "positionName": "他人私海", //位置
        "returnPhaseDesc": "确认商机", //回归前客户阶段
        "callNum": 10, //通话次数
        "returnTime": "yyyy-MM-dd HH:mm:ss", //上次回归公海时间
        "regressionReason": "回归公海原因", //回归公海原因
        "businessStatusDesc": "在营", //营业状态
        "leftDayDesc": "回归剩余天数描述", //回归剩余天数描述
        "isInHundred": 1, //是否是百城 1：是
        "isGroup": 1, //0:独立账户 1:集团账户
        "createdTime": "yyyy-MM-dd HH:mm:ss", //创建时间
        "isCollect": true, //是否收藏 true 已收藏 false 没有收藏
        "isDisplay": true, //是否可以认领
        "jumpFlag": 1, //跳转客户详情标识 1跳转私海 2 跳转公海 0 不能跳
        "claimIsGray": 1, //认领按钮是否置灰（0：不置灰、1：置灰）
        "labelSummaryList": [
            {
                "id": 2, //id
                "labelType": 100, //标签类型
                "labelName": "大型公司", //标签名称
                "labelShowType": 1 //标签展示标识 1高亮
            } //客户标签信息
        ],
        "contactInfoList": [
            {
                "id": 3, //联系人id
                "name": "张先生", //联系人名称
                "contactPhoneInfoList": [
                    {
                        "id": 32111, //号码id
                        "phone": "10086", //联系人号码
                        "lastCallTime": "yyyy-MM-dd HH:mm:ss", //最近拨打时间
                        "lastCallDuration": 120, //最近拨打时长(秒)
                        "lastSaleRecord": "最近销售记录", //最近销售记录
                        "lastCallFile": "crm/call/file/xxx.mp3", //最近通话录音
                        "phoneCheck": 2, //验证状态标签 1：已验证 2：错误号码
                        "phoneQuality": 11, //验证KP标签 批次10、11是验证Kp标签，其他批次是优质号码标签
                        "onlineStatus": 2, //空号状态 0：空号
                        "repeatStatus": 1, //禁止拨打标签（手机号是否在 t_contact_feedback）1：禁止拨打
                        "identify": {
                            "wrongStyleType": 1, //错号 1：绿色 2：黄色 3：红色 4：灰色
                            "wrongScore": 80, //错号分
                            "rejectStyleType": 2, //拒绝 1：绿色 2：黄色 3：红色 4：灰色
                            "rejectScore": 90 //拒绝分
                        } //错号分和拒绝分
                    },
                ] //联系方式信息
            } //联系人信息
        ]
    }
]
export default tableData;