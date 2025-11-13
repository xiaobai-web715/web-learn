import "./index.less";
const GamesEntry = () => {
    const myGamesList = [
        {
            name: "GTA5",
            image: "/anqu1.png"
        },
        {
            name: "LOL",
            image: "/anqu1.png"
        }
    ];
    return (
        <div className="entry-page bg-cover bg-center bg-no-repeat text-white">
            <div className="grid grid-rows-[1fr 2fr]">
                <div>
                    <div>GAMERS STORE</div>
                    <div>点击游戏图标查看详情介绍</div>
                </div>
                <div className="flex items-center justify-center">
                    {
                        myGamesList.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="w-48">
                                        <div style={{backgroundImage: `url(${item.image})`}} className="w-full pt-[128.5%] bg-cover bg-center bg-no-repeat"></div>
                                    </div>
                                    <div className="game-item-name">{item.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default GamesEntry