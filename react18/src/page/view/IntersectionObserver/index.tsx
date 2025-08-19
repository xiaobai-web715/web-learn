import React, { useRef } from 'react';

const IntersectionObserverTest = () => {
    const targetList = new Array(10000).fill(0);
    const containerRef = useRef<HTMLDivElement>(null);
    // const currentObserverHaveInView = (element: HTMLElement) => {
    //     const { top, bottom, left, right } = element.getBoundingClientRect();
    //     const { clientWidth, clientHeight } = document.documentElement;
    //     return top > 0 && left > 0 && bottom <= clientHeight && right <= clientWidth;
    // };
    const observer = new IntersectionObserver(
        (entries) => {
            console.log('entries', entries);
            entries.forEach((entry) => {
                // (entry.target as HTMLElement).style.backgroundColor = 'red';
                // currentObserverHaveInView(entry.target as HTMLElement) &&
                //     ((entry.target as HTMLElement).style.backgroundColor = 'red');
                if (entry.intersectionRatio > 0) {
                    // intersectionRatio 属性代表目标元素于可滑动的父级元素的交集
                    (entry.target as HTMLElement).style.backgroundColor = 'red';
                } else {
                    (entry.target as HTMLElement).style.backgroundColor = 'blue';
                }
            });
        },
        { threshold: 1.0 },
    );
    return (
        <div className="container w-[100vh] h-[100vh]" ref={containerRef}>
            {targetList.map((index) => {
                return (
                    <div
                        className="target w-[100%] h-[25px]"
                        key={index}
                        ref={(node) => {
                            if (node) {
                                observer.observe(node);
                            }
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default IntersectionObserverTest;
