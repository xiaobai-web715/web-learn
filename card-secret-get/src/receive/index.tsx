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
                <div className="max-h-max w-[400px] rounded-2xl bg-transparent pb-12 pt-6 text-white shadow-2xl">
                    <div className="pb-3 text-center text-[20px] font-bold">BBC-DMA</div>
                    <div className="relative m-auto box-border w-[80%] rounded-[10px] bg-[#eee]/30 p-4">
                        <div className="absolute left-0 top-0 h-full w-full rounded-[10px] border-l-4 border-l-amber-600"></div>
                        <div className="font-kai mb-2 text-[18px] font-bold">系统公告</div>
                        <div className="font-kai text-[14px]">每人每天限制领取2张卡密</div>
                        <div className="font-tai text-[14px]">Maximum 2 keys per user per day</div>
                        {/* <div>--------------------------</div>
                        <div className="font-kai text-[14px]">官方网站【https://bbcdma.com/ 】</div>
                        <div className="font-tai text-[14px]">{`Official Website [https://bbcdma.com/]`}</div> */}
                    </div>
                    <div className="mb-6 mt-6 flex items-center justify-center text-[16px] font-bold">
                        <div
                            className="ml-4 mr-4 cursor-pointer rounded-[5px] bg-[#52c41a] pb-2 pl-6 pr-6 pt-2 text-center active:scale-95 active:shadow-md"
                            onClick={() => getReceive()}
                        >
                            <div className="font-kai whitespace-nowrap text-center text-[16px]">
                                点击领取
                            </div>
                            <div className="font-tai whitespace-nowrap text-center text-[12px]">
                                Click to Claim
                            </div>
                        </div>
                        <div
                            className="ml-4 mr-4 cursor-pointer rounded-[5px] bg-[#1677ff] pb-2 pl-6 pr-6 pt-2 text-center active:scale-95 active:shadow-md"
                            onClick={() => gotoExternal(link.downloadAddress)}
                        >
                            <div className="font-kai whitespace-nowrap text-center text-[16px]">
                                点击下载
                            </div>
                            <div className="font-tai whitespace-nowrap text-center text-[12px]">
                                Download
                            </div>
                        </div>
                    </div>
                    <div className="m-auto w-[80%] rounded-[5px] bg-white pb-8 pt-8 text-center text-[14px] font-normal text-black">
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
                                <div className="font-kai whitespace-nowrap text-center text-[12px] text-[#999]">
                                    每日可以领取：2次
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    {cardText ? (
                        <div className="mt-6 pl-4 pr-4 text-start font-bold text-red-500">
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
