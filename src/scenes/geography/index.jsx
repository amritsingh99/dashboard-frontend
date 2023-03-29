import React from 'react'
import Header from 'components/Header'
import { Box, useTheme } from '@mui/material'
import { useGetGeographyQuery } from 'state/api'
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoData } from 'state/geoData'

const Geography = () => {
    const theme = useTheme()
    const { data, isLoading } = useGetGeographyQuery()
    console.log(data)
    return (
        <Box m={"1.5rem 2.5rem"}>
            <Header title={"GEOGRAPHY"} subtitle={"Product Distribution"}></Header>
            <Box
                mt="40px"
                height={"75vh"}
                border={`solid 1px ${theme.palette.secondary[200]}`}
                width="100%"
                borderRadius="4px"
            >
                {(data && !isLoading) ? 
        <ResponsiveChoropleth
        data={ data }
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
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
        // colors="nivo"
        domain={[ 0, 60 ]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={150}
        projectionTranslation={[ 0.45, 0.6 ]}
        projectionRotation={[ 0, 0, 0 ]}
        borderWidth={1.5}
        borderColor="#152538"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: theme.palette.alt,
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    /> : (<>Loading...</>)}
            </Box>
        </Box>
    )
}

export default Geography
