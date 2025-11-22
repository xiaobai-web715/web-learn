import "./index.less";
import React, { useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";
import { getReceiveRequest } from "@/request/index";
import { GetReceiveTag, PageTag, GetReceiveName, linkUrl, linkUrlTwo } from "@/utils/index";
import toast, { Toaster } from "react-hot-toast";
const Receive = () => {
    const [searchParams] = useSearchParams();
    const tag = searchParams.get("tag"); // 获取的tag查询参数
    const [isGetIng, setIsGetIng] = useState(false);
    const [cardText, setCardTest] = useState("");
    const getReceive = debounce(() => {
        if (isGetIng) {
            return;
        }
        setIsGetIng(true);
        getReceiveRequest(GetReceiveTag[(tag as PageTag) || PageTag.AQTW])
            .then((res) => {
                console.log("我是获取的接口信息", res);
                if (res.data.success) {
                    toast.success(res.data.message);
                    setCardTest(res.data.card_code);
                } else {
                    // setCardTest("123456");
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                if (err?.response?.data?.message) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error("获取失败");
                }
            })
            .finally(() => {
                setIsGetIng(false);
            });
    }, 500);
    const tagToUrl = {
        [PageTag.AQTW]: linkUrl,
        [PageTag.QDTJD]: linkUrlTwo,
    };
    const link = tagToUrl[(tag as PageTag) || PageTag.AQTW];
    const gotoExternal = (link: string) => {
        window.open(link, "_blank");
    };
    return (
        <React.Fragment>
            <Toaster position="top-right" />
            <div className="receive-page bg-linear-to-br flex h-screen w-screen items-center justify-center from-indigo-900 via-purple-800 to-fuchsia-700">
                <div className="max-h-max w-16 rounded-[0.16rem] bg-transparent pb-[0.48rem] pt-[0.24rem] text-white shadow-2xl [@media(max-width:520px)]:w-[80%]">
                    <div className="pb-[0.12rem] text-center text-[0.2rem] font-bold">BBC-DMA</div>
                    <div className="relative m-auto box-border w-[80%] rounded-[0.1rem] bg-[#eee]/30 p-[0.16rem]">
                        <div className="absolute left-0 top-0 h-full w-full rounded-[0.1rem] border-l-4 border-l-amber-600"></div>
                        <div className="font-kai mb-[0.08rem] text-[0.18rem] font-bold">
                            系统公告
                        </div>
                        <div className="font-kai text-[0.14rem]">每人每天限制领取2张卡密</div>
                        <div className="font-tai text-[0.14rem]">
                            Maximum 2 keys per user per day
                        </div>
                        {/* <div>--------------------------</div>
                        <div className="font-kai text-[14px]">官方网站【https://bbcdma.com/ 】</div>
                        <div className="font-tai text-[14px]">{`Official Website [https://bbcdma.com/]`}</div> */}
                    </div>
                    <div className="mb-[0.24rem] mt-[0.24rem] flex items-center justify-center text-[0.16rem] font-bold">
                        <div
                            className="ml-[0.16rem] mr-[0.16rem] cursor-pointer rounded-[0.05rem] bg-[#52c41a] pb-[0.08rem] pl-[0.24rem] pr-[0.24rem] pt-[0.08rem] text-center active:scale-95 active:shadow-md [@media(max-width:520px)]:pl-[0.14rem] [@media(max-width:520px)]:pr-[0.14rem]"
                            onClick={() => getReceive()}
                        >
                            <div className="font-kai whitespace-nowrap text-center text-[0.16rem]">
                                点击领取
                            </div>
                            <div className="font-tai whitespace-nowrap text-center text-[0.12rem]">
                                Click to Claim
                            </div>
                        </div>
                        <div
                            className="ml-[0.16rem] mr-[0.16rem] cursor-pointer rounded-[0.05rem] bg-[#1677ff] pb-[0.08rem] pl-[0.24rem] pr-[0.24rem] pt-[0.08rem] text-center active:scale-95 active:shadow-md [@media(max-width:520px)]:pl-[0.14rem] [@media(max-width:520px)]:pr-[0.14rem]"
                            onClick={() => gotoExternal(link.downloadAddress)}
                        >
                            <div className="font-kai whitespace-nowrap text-center text-[0.16rem]">
                                点击下载
                            </div>
                            <div className="font-tai whitespace-nowrap text-center text-[0.12rem]">
                                Download
                            </div>
                        </div>
                    </div>
                    <div className="m-auto w-[80%] rounded-[0.05rem] bg-white pb-[0.32rem] pt-[0.32rem] text-center text-[0.14rem] font-normal text-black">
                        {cardText ? (
                            <React.Fragment>
                                <div>Game：{GetReceiveName[(tag as PageTag) || PageTag.AQTW]}</div>
                                <div>卡密：{cardText}</div>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className="font-kai whitespace-nowrap text-center">
                                    点击上方获取卡密
                                </div>
                                <div className="font-kai whitespace-nowrap text-center text-[0.12rem] text-[#999]">
                                    每日可以领取：2次
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    {cardText ? (
                        <div className="mt-[0.24rem] pl-[0.16rem] pr-[0.16rem] text-start font-bold text-red-500">
                            !!!保存好卡密信息后再关闭当前页面，防止丢失
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Receive;
