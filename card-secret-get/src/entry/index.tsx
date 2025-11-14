import "./index.less";
import { PageTag } from "@/utils/index";
import { useNavigate } from "react-router-dom";
const GamesEntry = () => {
    const navigate = useNavigate();
    const myGamesList = [
        {
            name: "暗区突围",
            image: "/anqu1.png",
            tag: PageTag.AQTW,
        },
        {
            name: "穹顶突击队",
            image: "/anqu1.png",
            tag: PageTag.QDTJD,
        },
    ];
    const gotoInterPage = (tag: string) => {
        navigate(`/introduction?tag=${tag}`);
    };
    const gotoReceivePage = (tag: string) => {
        navigate(`/receive?tag=${tag}`);
    };
    return (
        <div className="entry-page bg-cover bg-center bg-no-repeat text-white">
            <div className="grid h-screen">
                <div className="flex items-center justify-center">
                    {myGamesList.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="group cursor-pointer pl-16 pr-16">
                                    <div
                                        className="relative m-auto h-[180px] w-[180px] transition-transform duration-300 ease-linear group-hover:translate-y-[-10px] rotate-45"
                                        onClick={() => gotoInterPage(item.tag)}
                                    >
                                        <div className="box-shadow-[0_0_60px_4px_rgba(0,0,0,0.5)] absolute inset-0 -rotate-90 transform rounded-lg border-8 border-gray-700 shadow-lg group-hover:border-red-600"></div>
                                        <div className="overflow-inherit absolute inset-0 transform rounded-lg border-gray-800 -rotate-45">
                                            <div
                                                style={{ backgroundImage: `url(${item.image})` }}
                                                className="clip-image absolute top-[-45%] w-full bg-cover bg-center bg-no-repeat pt-[160%]"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="game-item-name relative translate-y-14 text-center text-[22px] font-bold">
                                    {item.name}
                                    <div
                                        className="m-auto mt-2 max-w-max cursor-pointer whitespace-nowrap rounded-[5px] border-2 border-[#1677FF] pb-2 pl-3 pr-3 pt-2 text-[16px] active:scale-95 active:shadow-md"
                                        onClick={() => gotoReceivePage(item.tag)}
                                    >
                                        卡密领取
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GamesEntry;
