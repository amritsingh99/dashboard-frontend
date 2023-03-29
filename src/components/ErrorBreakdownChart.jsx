import React, { useState, useMemo } from 'react'
import { Box, useTheme } from "@mui/material"
import { ResponsivePie } from '@nivo/pie'
import { color } from '@mui/system'
import "react-datepicker/dist/react-datepicker.css"

const ErrorBreakdownChart = ({isDashboard = false, data}) => {
    const theme = useTheme()
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    

    return (        
        <Box
            height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
        >

    <ResponsivePie
        colors={{datum: "data.color"}}
        data={data}
        margin={ isDashboard ? 
            {top: 40, right: 80, bottom: 100, left: 50} 
           :{top: 40, right: 80, bottom: 80, left: -150}}
        // sortByValue={true}
        innerRadius={0.45}
        layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends']}    
        // padAngle={1.5}
        // cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        enableArcLinkLabels={!isDashboard}
        legends={[
            {
                
                anchor: 'top-right',
                direction: 'column',
                justify: false,
                translateX: isDashboard ? 20 : ((screenWidth !== 1920 || screenHeight !== 1080) ? 20 : -150),
                translateY: isDashboard ? 50 : 50,
                itemsSpacing: -50,
                itemWidth: 100,
                itemHeight: 80,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.secondary[500]
                        }
                    }
                ]
            }
        ]}
        theme={{
            labels : {  
                text : {
                    fontSize  : "16px"
                }
            },
            textColor: 'red',
            annotations : {
                text : {
                    fontSize: "16px",
                    fill: 'red'
                }
            },
            axis: {
                domain : {
                    line : {
                        stroke : theme.palette.secondary[200]
                    }
                },
                legend : {
                    text : {
                        fill: theme.palette.secondary[200]
                    }
                },
                ticks: {
                    line : {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                    },
                    text : {
                        fill : theme.palette.secondary[200]
                    }
                },
                
            },
            legends : {
                text : {
                    fill : theme.palette.secondary[200],
                    fontSize: "14px"
                }
            },
            tooltip : {
                container : {
                    color: theme.palette.primary.main,
                    fontSize: "16px"
                }
            }
        }}        
    />     
        </Box>
    )
}

export default ErrorBreakdownChart