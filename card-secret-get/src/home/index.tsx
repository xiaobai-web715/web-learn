import { useNavigate } from "react-router-dom"
import "./index.less";
const HomePage = () => {
    const navigate = useNavigate();
    const gotoEntryPage = () => {
        navigate('/gameEntry')
    }
    return (
        <div className="home-page-background relative h-screen w-screen bg-cover bg-center bg-no-repeat text-white">
            <div className="size-container grid h-full grid-rows-[2fr 2fr 2fr 1fr] [@media(max-height:700px)]:grid-flow-col [@media(max-height:700px)]:grid-cols-2 [@media(max-height:700px)]:grid-rows-[2fr 2fr 1fr]">
                <div className="[@media(max-height:700px)]:col-start-1 [@media(max-height:700px)]:col-end-3 pt-8">
                    <img className="header-background m-auto" src="/team.png" width="400" height="400"></img>
                </div>
                <div className="[@media(max-height:700px)]:col-start-1 text-[4rem] font-bold flex items-center justify-center">卡密领取</div>
                <div className="[@media(max-height:700px)]:col-start-2">
                    <div className="w-32 h-14 text-center bg-[#A5FF14] leading-14 text-black font-bold m-auto relative group cursor-pointer">
                        <span className="relative z-10" onClick={() => gotoEntryPage()}>进入首页</span>
                        <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-linear bg-black/30"></span>
                    </div>
                </div>
                <div className="items-center flex justify-center pl-8 pr-8 flex-wrap pb-8 [@media(max-height:700px)]:col-start-1  [@media(max-height:700px)]:col-end-3">
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
