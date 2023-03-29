import React, { useState, useMemo,useEffect } from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select, useTheme } from '@mui/material'
import Header from "components/Header"
import { useGetDailyInsightsQuery, useGetLatestDateQuery } from "state/api"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { ResponsiveLine } from '@nivo/line'
import { useAuthUser } from 'react-auth-kit'

const Daily = ({isDashboard = false}) => {

    const auth = useAuthUser()
    
    const [view, setView] = useState(auth().machines[0].toString())

    const theme = useTheme()
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    const { data, isLoading } = useGetDailyInsightsQuery({
        startDate: (startDate) ? startDate.toISOString() : null, 
        endDate: (endDate) ? endDate.toISOString() : null,        
        machine_id : view
    })

    if (!data || isLoading) return "Loading..."

    const { pickData } = data
    
    const totalPicksData = {
        id : "totalPicks",
        color : theme.palette.secondary.main,
        data : []
    }
    

    Object.values(pickData).forEach(({ logDATE, logTOTALPICKS }) => {
        const splitDate = logDATE.substring(logDATE.indexOf('-') + 1)
        totalPicksData.data = [
            ...totalPicksData.data,
            { x : splitDate, y : Number.parseInt(logTOTALPICKS).toFixed(0) }
        ]
    })

    // const formattedObject = 

    return (
        <Box m="1.5rem 2.5rem">
            <Header title="DAILY PICKS" subtitle="Chart of Daily Picks"/>
            <FormControl sx={{ mt: "1rem", width: "10%" }}>
                <InputLabel>View</InputLabel>
                <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                    {
                        auth().machines.map((machine_id) => {
                            return <MenuItem  key={machine_id.toString()} value={machine_id.toString()}>{machine_id}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>            
            <Box height="75vh">
            <Box display="flex" height="40px" justifyContent={"flex-end"} gap="1rem" border="solid 0px red" >
            <Box>
              <DatePicker
                showIcon
                label="Desktop variant"
                selected={(startDate ? startDate : new Date(data.startDate)) }
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={(startDate ? startDate : new Date(data.startDate))}
                endDate={(endDate ? endDate : new Date(data.endDate))}
                maxDate={(endDate ? endDate : new Date(data.endDate))}
              />
            </Box>
            <Box>
              <DatePicker
                selected={(endDate ? endDate : new Date(data.endDate)) }
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={(startDate ? startDate : new Date(data.startDate))}
                endDate={(endDate ? endDate : new Date(data.endDate))}
                minDate={(startDate ? startDate : new Date(data.startDate))}
              />
            </Box>
          </Box> 
                {data ? (    
        <ResponsiveLine
        data={[totalPicksData]}
        colors={{ datum: "color" }}
        margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false
        }}
        yFormat=">-.2f"
        curve='cardinal'
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: (v) => {
                if (isDashboard) return v.slice(0, 3)
                return v;
            },
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Month",
            legendOffset: 60,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Total",
            legendOffset: -50,
            legendPosition: 'middle',
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={true}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 50,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
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
                    fill : theme.palette.secondary[600]
                }
            },
            tooltip : {
                container : {
                    color: theme.palette.primary.main
                }
            },
            dots: {
                text: {
                    fill: theme.palette.secondary[600]
                },
            },            
        }}        
    />) :<> Loading...</>}
            </Box>
        </Box>
    )
}

export default Daily