import React, { useState, useMemo } from 'react'
import { Box, Typography, FormControl, MenuItem, InputLabel, Select, useTheme } from '@mui/material'
import Header from 'components/Header'
import ErrorBreakdownChart from "components/ErrorBreakdownChart"
import { useAuthUser } from 'react-auth-kit'
import { useGetErrorsQuery, useGetLatestDateQuery } from 'state/api'
import DatePicker from 'react-datepicker';

const ErrorBreakdown = () => {
  const auth = useAuthUser()
  const [view, setView] = useState(auth().machines[0].toString())

  const dayOffset = 15
  const theme = useTheme()
  const dateData = useGetLatestDateQuery({ machine_id : view })
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  // useMemo(() => {
  //   const fetchDate = async () => {
  //       if (!dateData.isLoading && dateData.data.status !== 'pending') {
  //           const date = new Date(dateData.data.latestDate)
  //           setEndDate(date)
  //           const newDate = new Date(date)
  //           newDate.setDate(date.getDate() - dayOffset)
  //           setStartDate(newDate)
  //       }
  //   }
  //   fetchDate()
  // }, [dateData])

  const { data, isLoading } = useGetErrorsQuery({
    startDate: (startDate) ? startDate.toISOString() : null, 
    endDate: (endDate) ? endDate.toISOString() : null, machine_id : view})
  console.log("🚀 ~ file: index.jsx:33 ~ ErrorBreakdown ~ data:", data)

  const oddColor = theme.palette.secondary[500]
  const evenColor = theme.palette.secondary[300]

  // const formattedData =  useMemo(() => {
  //   if (!data) return []
  //   return Object.entries(data.errorsByCategory).map(([category, errors], idx) => ({
  //     id: category,
  //     label: category,
  //     value: errors,
  //     color : (data.len % 2 === 0) ? ((idx % 2 === 0) ? evenColor : oddColor) : (((idx + 1) % 2 === 0) ? evenColor : oddColor)
  //   }))    
  // }, [data])
  if (!data || isLoading) return "Loading..."

  const formattedData = Object.entries(data.errorsByCategory).map(([category, errors], idx) => ({
    id: category,
    label: category,
    value: errors,
    color : (data.len % 2 === 0) ? ((idx % 2 === 0) ? evenColor : oddColor) : (((idx + 1) % 2 === 0) ? evenColor : oddColor)
  }))    
  console.log("🚀 ~ file: index.jsx:39 ~ const[formattedData]=useMemo ~ formattedData:", formattedData)


  return (
    <Box m={"1.5rem 2.5rem"}>
        <Header title={"BREAKDOWN"} subtitle={"Breakdown of Errors By Category"}/>
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
        <Box mt="" height="75vh">
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
            <ErrorBreakdownChart data={formattedData} />
        </Box>
    </Box>
  )
}


export default ErrorBreakdown