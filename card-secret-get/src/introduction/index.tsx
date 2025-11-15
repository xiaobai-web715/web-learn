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
        <div className="inter-page h-screen overflow-y-scroll p-16">
            <div className="mb-8 text-center text-[24px] font-bold text-[#da7b2c]">功能介绍</div>
            <div className="mb-8 flex items-center justify-center">
                <div
                    className="ml-15 mr-15 max-w-max cursor-pointer whitespace-nowrap rounded-[5px] border border-[#da7b2c] bg-[#da7b2c] pb-2 pl-3 pr-3 pt-2 font-bold text-white active:scale-95 active:shadow-md"
                    onClick={() => gotoExternal(link.discordChannel)}
                >
                    Discord频道
                </div>
                <div
                    className="ml-15 mr-15 max-w-max cursor-pointer whitespace-nowrap rounded-[5px] border border-[#da7b2c] bg-[#da7b2c] pb-2 pl-3 pr-3 pt-2 font-bold text-white active:scale-95 active:shadow-md"
                    onClick={() => gotoExternal(link.tgChannel)}
                >
                    TG频道
                </div>
                <div
                    className="ml-15 mr-15 max-w-max cursor-pointer whitespace-nowrap rounded-[5px] border border-[#da7b2c] bg-[#da7b2c] pb-2 pl-3 pr-3 pt-2 font-bold text-white active:scale-95 active:shadow-md"
                    onClick={() => gotoExternal(link.downloadAddress)}
                >
                    下载地址
                </div>
            </div>
            <div className="m-auto h-px w-[80%] bg-[#da7b2c]"></div>
            {info.imageList.map((item, index) => {
                return (
                    <div className="group relative m-auto mt-6 w-[80%] p-6">
                        <div className="absolute inset-0 z-0 rounded-lg border-2 border-gray-400/30 shadow-2xl transition-all duration-300 ease-linear group-hover:rotate-0 group-hover:border-[#1677FF] group-hover:shadow-red-500/40"></div>
                        <div className="z-5 pointer-events-none absolute inset-0 m-1 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]"></div>
                        <img key={index} src={item} className="w-full object-contain" />
                    </div>
                );
            })}
        </div>
    );
};

export default Introduction;
