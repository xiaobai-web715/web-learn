import "./index.less";
import { PageTag } from "@/utils/index";
import { useNavigate } from "react-router-dom";
const GamesEntry = () => {
    const navigate = useNavigate();
    const myGamesList = [
        {
            name: "暗区突围",
            samelName: "ABI",
            image: "/aqtw.png",
            tag: PageTag.AQTW,
            top: "-37.5%",
            left: "0%",
        },
        {
            name: "穹顶突击队",
            samelName: "ARC Raiders",
            image: "/qdtjd.jfif",
            // image: "/aqtu.png",
            tag: PageTag.QDTJD,
            top: "25%",
            left: "0%",
        },
    ];
    const gotoInterPage = (tag: string) => {
        navigate(`/introduction?tag=${tag}`);
    };
    const gotoReceivePage = (tag: string) => {
        navigate(`/receive?tag=${tag}`);
    };
    return (
        <div className="entry-page overflow-y-scroll bg-cover bg-center bg-no-repeat text-white">
            <div className="grid-style grid h-screen">
                <div className="pt-[0.24rem]">
                    <div className="font-kai text-center text-[0.4rem] font-bold">GAMERS STORE</div>
                    <div className="mt-[0.08rem] text-center text-[0.24rem] font-bold">
                        <div className="font-tai">点击游戏图标查看详情介绍</div>
                        <div className="font-kai text-[0.16rem]">
                            Click on the game icon to view the details
                        </div>
                    </div>
                </div>
                {/* flex flex-wrap items-start justify-center */}
                <div className="grid grid-cols-2 [@media(max-width:900px)]:grid-cols-1">
                    {myGamesList.map((item, index) => {
                        return (
                            // <div key={index} className="relative">
                            //     <div
                            //         className="group relative translate-x-[-60px] cursor-pointer ml-32 pr-32"
                            //         onClick={() => gotoInterPage(item.tag)}
                            //     >
                            //         <div className="relative m-auto w-[180px] transition-transform duration-300 ease-linear group-hover:translate-y-[-10px]">
                            //             {/* <div
                            //             className="relative m-auto h-[180px] w-[180px] rotate-45 transition-transform duration-300 ease-linear group-hover:translate-y-[-10px]"
                            //             onClick={() => gotoInterPage(item.tag)}
                            //         > */}
                            //             {/* <div className="box-shadow-[0_0_60px_4px_rgba(0,0,0,0.5)] overflow-inherit absolute inset-0 w-full -rotate-90 transform rounded-lg border-8 border-r-0 border-t-0 border-gray-700 shadow-lg group-hover:border-red-600">

                            //             </div> */}
                            //             {/* <div className="box-shadow-[0_0_60px_4px_rgba(0,0,0,0.5)] absolute inset-0 left-[-10%] top-[30%] h-full w-[160%] rounded-[5px] border-l-4 border-r-4 border-gray-700 shadow-lg group-hover:border-[#da7b2c]"></div> */}
                            //             <div className="box-shadow-[0_0_60px_4px_rgba(0,0,0,0.5)] border-l-6 border-r-6 absolute inset-0 left-[-6.5%] top-[15%] h-full w-[178%] rounded-[5px] border-gray-700 shadow-lg group-hover:border-[#16b9ff]"></div>
                            //             <div className="box-shadow-[0_0_60px_4px_rgba(0,0,0,0.5)] border-l-6 border-r-6 relative inset-0 left-0 top-0 w-[165%] rounded-[5px] border-gray-700 shadow-lg group-hover:border-[#16b9ff]">
                            //                 <div
                            //                     className="inset-0 max-h-max w-full rounded-lg border-gray-800"
                            //                     style={{ top: item.top, left: item.left }}
                            //                 >
                            //                     {/* <div
                            //                     style={{ backgroundImage: `url(${item.image})` }}
                            //                     className="clip-image absolute w-full bg-cover bg-center bg-no-repeat pt-[160%]"
                            //                 ></div> */}
                            //                     <img
                            //                         src={item.image}
                            //                         className="object-contain"
                            //                     ></img>
                            //                 </div>
                            //             </div>
                            //             {/* </div> */}
                            //         </div>
                            //     </div>
                            //     <div className="game-item-name relative translate-y-[45%] text-center text-[22px] font-bold">
                            //         <div className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text tracking-widest text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                            //             <span className="font-kai text-[20px]">{item.name}</span>
                            //             <span className="font-tai ml-2 text-[14px]">
                            //                 {item.samelName}
                            //             </span>
                            //         </div>
                            //         <div
                            //             className="bg-linear-to-r m-auto mt-2 max-w-max cursor-pointer whitespace-nowrap rounded-[5px] border-2 border-[#16b9ff] from-cyan-400 to-purple-400 bg-clip-text pb-2 pl-3 pr-3 pt-2 text-[16px] tracking-widest text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] active:scale-95 active:shadow-md"
                            //             onClick={() => gotoReceivePage(item.tag)}
                            //         >
                            //             卡密领取
                            //         </div>
                            //     </div>
                            // </div>
                            <div
                                key={index}
                                className="[@media(max-width:900px)]:mb-[0.2rem] [@media(max-width:900px)]:mt-[0.2rem]"
                            >
                                <div
                                    className="border-box group relative m-auto w-[3rem] cursor-pointer border-[0.03rem] border-gray-600 [@media(max-width:750px)]:w-[70%]"
                                    key={index}
                                    onClick={() => gotoInterPage(item.tag)}
                                >
                                    <div className="absolute left-0 top-0 h-[0.4rem] w-[0.4rem] -translate-x-[0.24rem] -translate-y-[0.2rem] border-l-[0.04rem] border-t-[0.04rem] border-blue-400 opacity-0 transition-all duration-500 ease-out group-hover:-translate-x-[0.12rem] group-hover:-translate-y-[0.08rem] group-hover:opacity-100 group-hover:blur-0"></div>
                                    <div className="absolute right-0 top-0 h-[0.4rem] w-[0.4rem] -translate-y-[0.2rem] translate-x-[0.24rem] border-r-[0.04rem] border-t-[0.04rem] border-blue-400 opacity-0 transition-all duration-500 ease-out group-hover:-translate-y-[0.08rem] group-hover:translate-x-[0.12rem] group-hover:opacity-100 group-hover:blur-0"></div>
                                    <div className="absolute bottom-0 right-0 h-[0.4rem] w-[0.4rem] translate-x-[0.24rem] translate-y-[0.2rem] border-b-[0.04rem] border-r-[0.04rem] border-blue-400 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-[0.12rem] group-hover:translate-y-[0.08rem] group-hover:opacity-100 group-hover:blur-0"></div>
                                    <div className="absolute bottom-0 left-0 h-[0.4rem] w-[0.4rem] -translate-x-[0.24rem] translate-y-[0.2rem] border-b-[0.04rem] border-l-[0.04rem] border-blue-400 opacity-0 transition-all duration-500 ease-out group-hover:-translate-x-[0.12rem] group-hover:translate-y-[0.08rem] group-hover:opacity-100 group-hover:blur-0"></div>
                                    <img
                                        src={item.image}
                                        className="object-contain group-hover:scale-105"
                                    ></img>
                                </div>
                                <div className="game-item-name relative mt-[0.48rem] text-center text-[0.22rem] font-bold">
                                    <div className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text tracking-widest text-transparent drop-shadow-[0_0_0.1rem_rgba(255,255,255,0.4)]">
                                        <span className="font-kai text-[0.2rem]">{item.name}</span>
                                        <span className="font-tai ml-[0.08rem] text-[14px]">
                                            {item.samelName}
                                        </span>
                                    </div>
                                    <div
                                        className="bg-linear-to-r m-auto mt-[0.08rem] max-w-max cursor-pointer whitespace-nowrap rounded-[0.05rem] border-[0.02rem] border-[#16b9ff] from-cyan-400 to-purple-400 bg-clip-text pb-[0.08rem] pl-[0.12rem] pr-[0.12rem] pt-[0.08rem] text-[0.16rem] tracking-widest text-transparent drop-shadow-[0_0_0.1rem_rgba(255,255,255,0.4)] active:scale-95 active:shadow-md"
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
