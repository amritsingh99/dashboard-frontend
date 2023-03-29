import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { useGetSalesQuery } from 'state/api'



const BreakdownChart = ({isDashboard = false}) => {
    const { data, isLoading } = useGetSalesQuery() 
    const theme = useTheme()

    if (!data || isLoading) return "Loading...";

    const colors = [
        theme.palette.secondary[500],
        theme.palette.secondary[300],
        theme.palette.secondary[300],
        theme.palette.secondary[500],
    ];

    const formattedData = Object.entries(data.salesByCategory).map(([category, sales], i) => ({
        id: category,
        label: category,
        value: sales,
        color: colors[i]
    }))

    console.log(formattedData)

    const CenteredMetric = ({ centerX, centerY }) => {
        return (
            <text
                fill={theme.palette.secondary[400]}
                x={centerX}
                y={centerY}
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '1.5rem',
                    fontWeight: 200,
                    textEmphasisColor: 'red',
                }}
            >
                {!isDashboard && "Total:"} ${data.yearlySalesTotal}
            </text>
        )
    }

    return (
        <Box
            height={isDashboard ? "400px" : "100%"}
            width={undefined}
            minHeight={isDashboard ? "325px" : undefined}
            minWidth={isDashboard ? "325px" : undefined}
            position="relative"
        >
    <ResponsivePie
        colors={{datum: "data.color"}}
        data={formattedData}
        margin={ isDashboard ? 
            {top: 40, right: 80, bottom: 100, left: 50} 
           :{top: 40, right: 80, bottom: 80, left: 80}}
        sortByValue={true}
        innerRadius={0.45}
        layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
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
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: isDashboard ? 20 : 0,
                translateY: isDashboard ? 50 : 56,
                itemsSpacing: 0,
                itemWidth: 85,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.primary[500]
                        }
                    }
                ]
            }
        ]}
        theme={{
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
                    fill : theme.palette.secondary[200]
                }
            },
            tooltip : {
                container : {
                    color: theme.palette.primary.main
                }
            }
        }}        
    />     
      
        </Box>
    )
}

export default BreakdownChart