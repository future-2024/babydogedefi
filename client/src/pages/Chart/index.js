import React, { useState, useEffect, useHistory } from 'react';
import $ from 'jquery';
import { LinearGradient, RadialGradient } from '@visx/gradient';
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    AnimatedAreaSeries,
    XYChart,
    Tooltip
  } from "@visx/xychart";
import moment from 'moment';
  
const accessors = {
    xAccessor: (d) => d.date,
    yAccessor: (d) => d.price
};


const Chart = ({coinType, coinName}) => {
    const [babydoge, setBabydogePrice] = useState([]);

    useEffect(() => {
        window.setTimeout(function() {
            $.ajax({
              url: `https://api.coingecko.com/api/v3/coins/${coinType}/market_chart?vs_currency=usd&days=1`,
              method: "GET",
              success: function(response) {
                console.log(response.prices);
                setBabydogePrice(response.prices);
              }
            });
        }, 100);
        console.log('--coinType', coinType);
    }, []);

    const mappedData = React.useMemo(() => {
        return babydoge.map((ele) => ({
              date: moment(ele[0]).format('MM-DD HH:mm'),
              price: ele[1],
            }));
    }, [babydoge]);

    return (
        <>
            <div style={{
                width: '200px',
                height: '200px'
            }}>
            {console.log(mappedData.splice(0, 5))}
                {coinType === 'baby-doge-coin' && (
                    <>
                    
                    <XYChart strokeWidth={1.5} fill={`url(#gradient)`} width={300} height={250} xScale={{ type: "band" }} yScale={{ type: "linear", domain: [0.0000000031, 0.00000000315], zero:false }}>
                        <LinearGradient
                            id="area-gradient"
                            from='#fff'
                            fromOpacity={1}
                            to='MediumSeaGreen'
                            toOpacity={0}
                        />
                        <AnimatedAxis orientation="bottom" numTicks={3} label='Date and time'/>
                        <AnimatedAxis orientation="left" numTicks={3} label='Token Price $'/>
                        <AnimatedGrid columns={false} numTicks={0} />
                        <AnimatedAreaSeries 
                            dataKey="Line 1" data={mappedData.splice(0, 30)} {...accessors} 
                            // strokeWidth={1}
                            // stroke="url(#area-gradient)"
                            fill="url(#area-gradient)"    
                        />
                        <Tooltip
                            snapTooltipToDatumX
                            snapTooltipToDatumY
                            showVerticalCrosshair
                            showSeriesGlyphs
                            renderTooltip={({ tooltipData, colorScale }) => (
                            <div>
                                <div style={{ fontSize:'15px', color: colorScale(tooltipData.nearestDatum.key), padding:'5px 0px' }}>
                                {coinName} Price
                                </div>
                                <span class='text-warning'>Date</span> : {accessors.xAccessor(tooltipData.nearestDatum.datum)}<br/>
                                <span class='text-info'>Price</span> : {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                            </div>
                            )}
                        />
                    </XYChart>
                    </>
                )}
                {coinType === 'binancecoin' && (
                    <XYChart width={300} height={250} xScale={{ type: "band" }} yScale={{ type: "linear", domain: [375, 385], zero:false }}>
                        <LinearGradient
                            id="area-gradient"
                            from='#fff'
                            fromOpacity={1}
                            to='MediumSeaGreen'
                            toOpacity={0.5}
                        />
                        <AnimatedAxis orientation="bottom" numTicks={3} label='Date and time'/>
                        <AnimatedAxis orientation="left" numTicks={3}/>
                        <AnimatedGrid columns={false} numTicks={0} />
                        <AnimatedAreaSeries 
                            dataKey="Line 1" data={mappedData.splice(0, 30)} {...accessors} 
                            // strokeWidth={1}
                            // stroke="url(#area-gradient)"
                            fill="url(#area-gradient)"    
                        />
                        <Tooltip
                            snapTooltipToDatumX
                            snapTooltipToDatumY
                            showVerticalCrosshair
                            showSeriesGlyphs
                            renderTooltip={({ tooltipData, colorScale }) => (
                            <div>
                                <div style={{ fontSize:'15px', color: colorScale(tooltipData.nearestDatum.key), padding:'5px 0px' }}>
                                {coinName} Price
                                </div>
                                <span class='text-warning'>Date</span> : {accessors.xAccessor(tooltipData.nearestDatum.datum)}<br/>
                                <span class='text-info'>Price</span> : {accessors.yAccessor(tooltipData.nearestDatum.datum)}
                            </div>
                            )}
                        />
                    </XYChart>
                )}
            </div>          
        </>
    )
}

export default Chart;
