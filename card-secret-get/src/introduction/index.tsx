import "./index.less"
import { PageTag, linkUrl } from "@/utils/index"
import { useSearchParams } from "react-router-dom"
const Introduction = () => {
    const [searchParams] = useSearchParams();
    console.log("我是传入进来的searchParams", searchParams)
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
            ]
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
            ]
        }
    }
    const info = tagToImageInfo[tag as PageTag || PageTag.AQTW]
    const gotoExternal = (link: string) => {
        window.open(link, "_blank");
    }
    return (
        <div className="inter-page h-screen overflow-y-scroll p-16">
            <div className="text-center text-[#da7b2c] font-bold text-[24px] mb-8">功能介绍</div>
            <div className="flex items-center justify-center mb-8">
                <div className="cursor-pointer pb-2 pl-3 pr-3 pt-2 text-white border border-[#da7b2c] max-w-max bg-[#da7b2c] rounded-[5px] ml-15 mr-15 font-bold" onClick={() => gotoExternal(linkUrl.discordChannel)}>discord频道</div>
                <div className="cursor-pointer pb-2 pl-3 pr-3 pt-2 text-white border border-[#da7b2c] max-w-max bg-[#da7b2c] rounded-[5px] ml-15 mr-15 font-bold" onClick={() => gotoExternal(linkUrl.tgChannel)}>tg频道</div>
                <div className="cursor-pointer pb-2 pl-3 pr-3 pt-2 text-white border border-[#da7b2c] max-w-max bg-[#da7b2c] rounded-[5px] ml-15 mr-15 font-bold" onClick={() => gotoExternal(linkUrl.downloadAddress)}>下载地址</div>
            </div>
            <div className="w-[80%] h-px bg-[#da7b2c] m-auto">
            </div>
            {
                info.imageList.map((item, index) => {
                    return (
                        <div className="group p-6 mt-6 w-[80%] m-auto relative">
                            <div className="absolute inset-0 border-2 border-gray-400/30 shadow-2xl group-hover:rotate-0 group-hover:border-[#1677FF] group-hover:shadow-red-500/40
    transition-all duration-300 ease-linear z-0 rounded-lg"></div>
     <div className="absolute inset-0 m-1 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] z-5 pointer-events-none"></div>
                            <img key={index} src={item} className="object-contain w-full" />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Introduction;
