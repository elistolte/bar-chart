import React, {ReactNode, useEffect, useState} from 'react';

interface BarChartProps {
    data: Array<{x:string, y:number}>;
    fontFamily?: string;
    fontUrl?: string;
    width?: number;
    height?: number;
    alpha?: string;
    mod?: string;
    accent?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
    data, 
    fontFamily = 'Chillax',
    fontUrl = 'https://db.onlinewebfonts.com/t/5f13274ffe3e1ee77b67324cb1a9cf7c.woff2',
    width = 600,
    height = 300,
    alpha = '#E8C4B8',
    mod = '#363434',
    accent = '#E8C4B8',
}) => {
    
    useEffect(() => {
        if (fontFamily === 'Chillax' && !document.querySelector('#chillax-font')) {
            const style = document.createElement('style');
            style.id = 'chillax-font';
            style.textContent = `
                @font-face {
                    font-family: 'Chillax';
                    src: url('${fontUrl}') format('woff2');
                    font-weight: bold;
                    font-style: normal;
                }
            `;
            document.head.appendChild(style);
        }
    }, [fontFamily, fontUrl]);




    {/*calcs (that means calculator, i'm using slang.) */}
    const maxY = Math.max(...data.map(item => item.y));
    const chartHeight = height;
    const containerWidth = width;
    const marginX = width * .025;
    const marginY = height * .033;
    const yAxisWidth = width * 0.083;
    const availableWidth = width - yAxisWidth - (2 * marginX); // Space after y-axis and padding
    const barSlotWidth = availableWidth / data.length;
    const barWidth = barSlotWidth * 0.7
    const spacing = barSlotWidth *.15
    const yAxisLabels: Array<{ value: number; position: number }> = [] /* empty arr, will fill with labels as % of max */
    const yAxisMax = Math.ceil((maxY * 1.2) / 10) * 10;
    const stepSize = yAxisMax / 10;


    
    for (let i = 0; i<=10; i++) {
        const value = stepSize * i;
        const position = (i / 10) * (chartHeight - 2 * marginY);
        yAxisLabels.push({ value, position });
    }
    const [animatedBars, setAnimatedBars] = useState<number[]>([]);
    useEffect(() => {
        data.forEach((_, index) => {
            setTimeout(() => {
                setAnimatedBars(prev => [...prev, index]);

            }, index * 150);
        });
    }, []);

    return (
        
        <div style={{
            width: '100%',
            maxWidth: width,
            fontFamily: fontFamily,
            backgroundColor: 'transparent',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Main Chart Area - using flexbox layout */}
            <div style={{
                display: 'flex',
                position: 'relative',
                height: `${chartHeight}px`,
            }}>
                {/* y axis labels - empty spacer */}
                <div style={{
                    width: `${yAxisWidth}px`,
                    height: '100%',
                    flexShrink: 0,
                }}></div>

                {/* Grid lines and bars container */}
                <div style={{
                    position: 'relative',
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* Grid lines with Y-axis labels */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: `${marginY}px ${marginX}px`,
                        pointerEvents: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}>
                        {yAxisLabels.slice().reverse().map((label, index) => {
                            const realIndex = yAxisLabels.length - 1 - index;
                            const isAnimated = animatedBars.includes(realIndex);
                            const currentOpacity = isAnimated ? 1 : 0;
                            return (
                                <div key={index} style={{
                                    width: '100%',
                                    // height: '1px',
                                    // backgroundColor: mod,
                                    // opacity: '0.8',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: `-${marginX + yAxisWidth - 10}px`,
                                        fontSize: '12px',
                                        color: mod,
                                        textAlign: 'right',
                                        width: `${yAxisWidth - 20}px`,
                                        opacity: `${currentOpacity}`,
                                        transition: 'opacity 1.1s ease-out',
                                        pointerEvents: 'auto',
                                    }}>
                                        {Math.round(label.value)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bars Container - flexbox layout */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'space-evenly',
                        height: '100%',
                        padding: `${marginY}px ${marginX}px`,
                        gap: `${spacing * 2}px`,
                    }}>
                        {data.map((item, index) => {
                            const barHeight = (item.y / yAxisMax) * (chartHeight - 2*marginY);
                            const isAnimated = animatedBars.includes(index);
                            const currentHeight = isAnimated ? barHeight : 0;
                            return (
                                <div
                                    key={index}
                                    style={{
                                        width: `${barWidth}px`,
                                        height: `${currentHeight}px`,
                                        backgroundColor: mod,
                                        borderRadius: '10px 10px 0 0',
                                        transition: 'height 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                        flexShrink: 0,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/*Labels Container - match bars container alignment*/}
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                marginLeft: `${yAxisWidth}px`,
                padding: `0 ${marginX}px`,
                gap: `${spacing * 2}px`,
            }}>
                {data.map((item, index) => {
                    const isAnimated = animatedBars.includes(index);
                    const currentOpacity = isAnimated ? 1 : 0;
                    return (
                        <div key={index}
                            style={{
                                width: `${barWidth}px`,
                                textAlign: 'center',
                                fontSize: '14px',
                                color: mod,
                                opacity: `${currentOpacity}`,
                                transition: 'opacity 1.1s ease-out',
                                flexShrink: 0,
                            }}
                        >   
                            {item.x} {/* labels */}
                        </div>
                    )})}
            </div>

        </div>
    );
};


export default BarChart;