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
                <div className="pt-8 [@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3">
                    <img
                        className="header-background m-auto"
                        src="/icon.png"
                        width="300"
                        height="300"
                    ></img>
                </div>
                <div className="font-kai text-[4rem]! font-bold! flex items-center justify-center whitespace-nowrap [@media(max-height:700px)]:col-start-1">
                    BBC-CHEAT
                </div>
                <div className="flex items-center justify-center [@media(max-height:700px)]:col-start-2">
                    <div
                        className="leading-14 group relative m-auto h-14 w-32 cursor-pointer overflow-hidden bg-[#da7b2c] text-center font-bold text-white active:scale-95 active:shadow-md"
                        onClick={() => gotoEntryPage()}
                    >
                        <span className="font-tai relative z-10 whitespace-nowrap">进入首页</span>
                        <span className="absolute inset-0 translate-y-full bg-black/30 transition-transform duration-300 ease-linear group-hover:translate-y-0"></span>
                    </div>
                </div>
                <div className="m-auto flex flex-wrap items-center pb-8 pl-8 pr-8 [@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3">
                    <div
                        className="mb-5 ml-11 mr-11 cursor-pointer text-start"
                        onClick={() => gotoExternal(homePageLinkUrl.tgChannel)}
                    >
                        <div className="font-kai whitespace-nowrap text-[14px]">JOIN TG</div>
                        <div className="font-tai whitespace-nowrap text-[22px]">加入TG频道</div>
                    </div>
                    <div
                        className="mb-5 ml-11 mr-11 cursor-pointer"
                        onClick={() => gotoExternal(homePageLinkUrl.discordChannel)}
                    >
                        <div className="font-kai whitespace-nowrap text-[14px]">JOIN DISCORD</div>
                        <div className="font-tai whitespace-nowrap text-[22px]">加入DISCRD</div>
                    </div>
                    <div
                        className="mb-5 ml-11 mr-11 cursor-pointer whitespace-nowrap"
                        onClick={() => gotoExternal(homePageLinkUrl.downloadAddress)}
                    >
                        <div className="font-kai whitespace-nowrap text-[14px]">DOWNLOAD</div>
                        <div className="font-tai whitespace-nowrap text-[22px]">下载地址</div>
                    </div>
                    {/* <div className="mr-16 whitespace-nowrap">常见问题</div> */}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
