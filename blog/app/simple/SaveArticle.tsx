'use client';
interface SaveArticleProps {
    saveArticle: () => void;
}

const SaveArticle = (props: SaveArticleProps) => {
    return (
        <div>
            <button
                className="fixed bottom-[2rem] right-[2rem] pl-[0.4rem] md:pl-[0.8rem] pr-[0.4rem] md:pr-[0.8rem] pt-[0.4rem] md:pt-[0.5rem] pb-[0.4rem] md:pb-[0.5rem] whitespace-nowrap rounded-[0.3rem] md:rounded-[0.5rem] cursor-pointer background-line-gradient"
                onClick={() => {
                    props.saveArticle();
                }}
            >
                保存文章
            </button>
        </div>
    );
};

export default SaveArticle;
