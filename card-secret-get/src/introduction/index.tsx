import "./index.less";
import { PageTag, linkUrl, linkUrlTwo } from "@/utils/index";
import { useSearchParams } from "react-router-dom";
const Introduction = () => {
    const [searchParams] = useSearchParams();
    const tag = searchParams.get("tag"); // 获取的tag查询参数
    const tagToImageInfo = {
        [PageTag.AQTW]: {
            imageList: [
                `/images/${PageTag.AQTW}/image-1.png`,
                `/images/${PageTag.AQTW}/image-2.png`,
                `/images/${PageTag.AQTW}/image-3.png`,
                `/images/${PageTag.AQTW}/image-4.png`,
                `/images/${PageTag.AQTW}/image-5.png`,
                `/images/${PageTag.AQTW}/image-6.png`,
                `/images/${PageTag.AQTW}/image-7.png`,
                `/images/${PageTag.AQTW}/image-8.png`,
                `/images/${PageTag.AQTW}/image-9.png`,
            ],
        },
        [PageTag.QDTJD]: {
            imageList: [
                `/images/${PageTag.QDTJD}/image-1.png`,
                `/images/${PageTag.QDTJD}/image-2.jfif`,
                `/images/${PageTag.QDTJD}/image-3.jfif`,
                `/images/${PageTag.QDTJD}/image-4.jfif`,
                `/images/${PageTag.QDTJD}/image-5.jfif`,
                `/images/${PageTag.QDTJD}/image-6.jfif`,
                `/images/${PageTag.QDTJD}/image-7.jfif`,
            ],
        },
    };
    const tagToUrl = {
        [PageTag.AQTW]: linkUrl,
        [PageTag.QDTJD]: linkUrlTwo,
    };
    const info = tagToImageInfo[(tag as PageTag) || PageTag.AQTW];
    const link = tagToUrl[(tag as PageTag) || PageTag.AQTW];
    const gotoExternal = (link: string) => {
        window.open(link, "_blank");
    };
    return (
        <div className="inter-page h-screen overflow-y-scroll">
            <div className="m-auto pb-1 pt-1 text-center text-[0.24rem] font-bold text-white">
                功能介绍
            </div>
            {/* [@media(max-width:750px)]:grid-cols-2 */}
            <div className="mb-[0.32rem] grid grid-cols-3">
                {/* [@media(max-width:750px)]:col-start-1 [@media(max-width:750px)]:col-end-3 [@media(max-width:750px)]:mb-[0.2rem] */}
                <div
                    className="bg-linear-to-br [@media(max-width:750px)]:bt-[0.02rem] [@media(max-width:750px)]:rounded-none! max-w-max cursor-pointer justify-self-center whitespace-nowrap rounded-[0.05rem] from-cyan-400 to-purple-400 pb-[0.08rem] pl-[0.12rem] pr-[0.12rem] pt-[0.08rem] font-bold text-white active:scale-95 active:shadow-md [@media(max-width:750px)]:ml-[0.12rem] [@media(max-width:750px)]:justify-self-start [@media(max-width:750px)]:border-b-[0.01rem] [@media(max-width:750px)]:border-[#16b9ff] [@media(max-width:750px)]:bg-transparent [@media(max-width:750px)]:bg-clip-text [@media(max-width:750px)]:p-0 [@media(max-width:750px)]:text-transparent"
                    onClick={() => gotoExternal(link.discordChannel)}
                >
                    Discord频道
                </div>
                <div
                    className="bg-linear-to-br [@media(max-width:750px)]:bt-[0.02rem] [@media(max-width:750px)]:rounded-none! max-w-max cursor-pointer justify-self-center whitespace-nowrap rounded-[0.05rem] from-cyan-400 to-purple-400 pb-[0.08rem] pl-[0.12rem] pr-[0.12rem] pt-[0.08rem] font-bold text-white active:scale-95 active:shadow-md [@media(max-width:750px)]:border-b-[0.01rem] [@media(max-width:750px)]:border-[#16b9ff] [@media(max-width:750px)]:bg-transparent [@media(max-width:750px)]:bg-clip-text [@media(max-width:750px)]:p-0 [@media(max-width:750px)]:text-transparent"
                    onClick={() => gotoExternal(link.tgChannel)}
                >
                    TG频道
                </div>
                <div
                    className="bg-linear-to-br [@media(max-width:750px)]:bt-[0.02rem] [@media(max-width:750px)]:rounded-none! max-w-max cursor-pointer justify-self-center whitespace-nowrap rounded-[0.05rem] from-cyan-400 to-purple-400 pb-[0.08rem] pl-[0.12rem] pr-[0.12rem] pt-[0.08rem] font-bold text-white active:scale-95 active:shadow-md [@media(max-width:750px)]:mr-[0.12rem] [@media(max-width:750px)]:justify-self-end [@media(max-width:750px)]:border-b-[0.01rem] [@media(max-width:750px)]:border-[#16b9ff] [@media(max-width:750px)]:bg-transparent [@media(max-width:750px)]:bg-clip-text [@media(max-width:750px)]:p-0 [@media(max-width:750px)]:text-transparent"
                    onClick={() => gotoExternal(link.downloadAddress)}
                >
                    下载地址
                </div>
            </div>
            {/* <div className="bg-linear-to-r m-auto h-[0.01rem] w-[80%] from-cyan-400 to-purple-400 [@media(max-width:750px)]:w-[90%]"></div> */}
            {info.imageList.map((item, index) => {
                return (
                    <div className="group relative m-auto mt-[0.24rem] w-[80%] p-[0.08rem] [@media(max-width:750px)]:w-[90%]">
                        <div className="absolute inset-0 z-0 rounded-[0.08rem] border-[0.04rem] border-gray-400/30 shadow-2xl transition-all duration-300 ease-linear group-hover:rotate-0 group-hover:border-[#16b9ff] group-hover:shadow-red-500/40"></div>
                        <div className="z-5 pointer-events-none absolute inset-0 m-1 rounded-lg shadow-[inset_0_0_0.15rem_rgba(0,0,0,0.5)]"></div>
                        <img key={index} src={item} className="w-full object-contain" />
                    </div>
                );
            })}
        </div>
    );
};

export default Introduction;
