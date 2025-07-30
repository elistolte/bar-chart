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
    alpha = '#ffffff',
    mod = '#FDFDFD',
    accent = '#F1CFC3',
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
            backgroundColor: alpha,
            position: 'relative',
        }}>
            <div style={{display:'flex'}}>
                {/* y axis labels */}
                <div style={{
                    position: 'relative',
                    width: `${yAxisWidth}px`,
                    height: `${chartHeight}px`,
                    padding: `${0.5 * marginY}px 0`,
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>
                    {yAxisLabels.map((label, index) => {
                        const isAnimated = animatedBars.includes(index);
                        const currentOpacity = isAnimated ? 1 : 0;
                        return (
                            <div
                                key={index}
                                style={{
                                    position: 'absolute',
                                    bottom: `${label.position}px`,
                                    right: '10px',
                                    fontSize: '12px',
                                    color: '#666',
                                    textAlign: 'right',
                                    opacity: `${currentOpacity}`,
                                    transition: 'opacity 1.1s ease-out'
                                }}
                            >
                                {Math.round(label.value)}
                            </div>
                        )
})}
                </div>
            {/* Grid lines - goes between y-axis and bars */}
            <div style={{
                position: 'absolute',
                left: `${yAxisWidth}px`,
                width: `${availableWidth + 2*marginX}px`,
                height: `${chartHeight}px`,
                padding: `${0.5 * marginY}px 0`,  // SAME padding as y-axis labels
                pointerEvents: 'none',
            }}>
                {yAxisLabels.map((label, index) => (
                    <div key={index} style={{
                        position: 'absolute',
                        bottom: `${label.position}px`,
                        left: '0',
                        width: '100%',
                        height: '1px',
                        backgroundColor: mod,
                        opacity: '0.8',  // Translucent
                    }} />
                ))}
            </div>
            {/* Bars Container */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: `${chartHeight}px`,
                
                padding: `${marginY}px ${marginX}`,

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
                                backgroundColor: ' #3b82f6',
                                margin: `0 ${spacing}px`,
                                borderRadius: '10px 10px 0 0',
                                transition: 'height 0.6s cubic-bezier(0.2, 0, 0.8, 1)'
                            }}
                        />
                    );
                })}
                </div>
            </div> 
        {/*Labels Container*/}
        <div style={{
            display: 'flex',
            marginLeft: `${yAxisWidth}px`,
            marginRight: `${marginX}px`,
        }}>
            {data.map((item, index) => {
                const isAnimated = animatedBars.includes(index);
                const currentOpacity = isAnimated ? 1 : 0;
                return (
                    <div key={index}
                    style={{
                            width: `${barSlotWidth}px`,
                            textAlign: 'center',
                            fontSize: '14px',
                            color: '#666',
                            opacity: `${currentOpacity}`,
                            transition: 'opacity 1.1s ease-out'
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