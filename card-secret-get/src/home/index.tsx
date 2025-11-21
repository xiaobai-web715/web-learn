import { useNavigate } from "react-router-dom";
import { homePageLinkUrl } from "@/utils/index";
import "./index.less";
const HomePage = () => {
    const navigate = useNavigate();
    const gotoEntryPage = () => {
        navigate("/gameEntry");
    };
    const gotoExternal = (link: string) => {
        window.open(link, "_blank");
    };
    return (
        <div className="home-page-background relative h-screen w-screen bg-cover bg-center bg-no-repeat text-white">
            <div className="size-container grid-rows-[1.5fr 1.5fr 1.5fr 1fr] [@media(max-height:700px)]:grid-rows-[2fr 2fr 1fr] grid h-full [@media(max-height:700px)]:grid-flow-col [@media(max-height:700px)]:grid-cols-2">
                <div className="pt-[0.32rem] [@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3">
                    <img
                        className="header-background m-auto"
                        src="/icon.png"
                        width="300"
                        height="300"
                    ></img>
                </div>
                <div className="font-kai font-bold! flex items-center justify-center whitespace-nowrap text-[0.64rem] [@media(max-height:700px)]:col-start-1 [@media(max-width:750px)]:text-[0.25rem]">
                    BBC-CHEAT
                </div>
                <div className="flex items-center justify-center [@media(max-height:700px)]:col-start-2">
                    <div
                        className="group relative m-auto h-[0.56rem] w-[1.28rem] cursor-pointer overflow-hidden bg-[#1668dc] text-center font-bold leading-[0.56rem] text-white active:scale-95 active:shadow-md"
                        onClick={() => gotoEntryPage()}
                    >
                        <div className="font-tai relative z-10 whitespace-nowrap text-[0.16rem]">
                            进入首页
                        </div>
                        <span className="absolute inset-0 translate-y-full bg-black/30 transition-transform duration-300 ease-linear group-hover:translate-y-0"></span>
                    </div>
                </div>
                <div className="m-auto flex flex-wrap items-center pb-[0.32rem] pl-[0.32rem] pr-[0.32rem] [@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3">
                    <div
                        className="z-1 relative mb-[0.2rem] ml-[0.44rem] mr-[0.44rem] flex -translate-x-[10%] cursor-pointer items-center justify-center text-start"
                        onClick={() => gotoExternal(homePageLinkUrl.tgChannel)}
                    >
                        <div className="relative translate-x-[15%]">
                            <img src="/tg.png" width="62" className="object-contain"></img>
                            <div className="absolute left-[50%] top-[50%] z-[-1] h-[0.2rem] w-[0.2rem] -translate-x-[50%] -translate-y-[50%] bg-white"></div>
                        </div>
                        <div>
                            <div className="font-kai whitespace-nowrap text-[0.14rem]">JOIN TG</div>
                            <div className="font-tai whitespace-nowrap text-[0.22rem]">
                                加入TG频道
                            </div>
                        </div>
                    </div>
                    <div
                        className="mb-[0.2rem] ml-[0.44rem] mr-[0.44rem] flex cursor-pointer items-center justify-start"
                        onClick={() => gotoExternal(homePageLinkUrl.discordChannel)}
                    >
                        <img src="/discount.png" width="45" className="object-contain"></img>
                        <div>
                            <div className="font-kai whitespace-nowrap text-[0.14rem]">
                                JOIN DISCORD
                            </div>
                            <div className="font-tai whitespace-nowrap text-[0.22rem]">
                                加入DISCRD
                            </div>
                        </div>
                    </div>
                    <div
                        className="mb-[0.2rem] ml-[0.44rem] mr-[0.44rem] cursor-pointer whitespace-nowrap"
                        onClick={() => gotoExternal(homePageLinkUrl.downloadAddress)}
                    >
                        <div className="font-kai whitespace-nowrap text-[0.14rem]">DOWNLOAD</div>
                        <div className="font-tai whitespace-nowrap text-[0.22rem]">下载地址</div>
                    </div>
                    {/* <div className="mr-16 whitespace-nowrap">常见问题</div> */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
