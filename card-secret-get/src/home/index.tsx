import { useNavigate } from "react-router-dom";
import "./index.less";
const HomePage = () => {
    const navigate = useNavigate();
    const gotoEntryPage = () => {
        navigate("/gameEntry");
    };
    return (
        <div className="home-page-background relative h-screen w-screen bg-cover bg-center bg-no-repeat text-white">
            <div className="size-container grid-rows-[2fr 1.5fr 2fr 1fr] [@media(max-height:700px)]:grid-rows-[2fr 2fr 1fr] grid h-full [@media(max-height:700px)]:grid-flow-col [@media(max-height:700px)]:grid-cols-2">
                <div className="pt-8 [@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3">
                    <img
                        className="header-background m-auto"
                        src="/team.png"
                        width="400"
                        height="400"
                    ></img>
                </div>
                <div className="flex items-center justify-center text-[4rem] font-bold [@media(max-height:700px)]:col-start-1">
                    卡密领取
                </div>
                <div className="[@media(max-height:700px)]:col-start-2">
                    <div className="leading-14 group relative m-auto h-14 w-32 cursor-pointer overflow-hidden bg-[#A5FF14] text-center font-bold text-black">
                        <span className="relative z-10" onClick={() => gotoEntryPage()}>
                            进入首页
                        </span>
                        <span className="absolute inset-0 translate-y-full bg-black/30 transition-transform duration-300 ease-linear group-hover:translate-y-0"></span>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center pb-8 pl-8 pr-8 [@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3">
                    <div className="mr-16 whitespace-nowrap">TG频道</div>
                    <div className="mr-16 whitespace-nowrap">加入discord</div>
                    <div className="mr-16 whitespace-nowrap">下载地址</div>
                    <div className="mr-16 whitespace-nowrap">常见问题</div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
