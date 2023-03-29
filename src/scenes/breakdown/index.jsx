import React, { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import Header from 'components/Header'
import BreakdownChart from "components/BreakdownChart"
import { useGetLatestDateQuery } from 'state/api'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

const Breakdown = () => {

  return (
    <Box m={"1.5rem 2.5rem"}>
        <Header title={"BREAKDOWN"} subtitle={"Breakdown of Sales By Category"}/>
        <Box mt="40px" height={"75vh"}>
            <BreakdownChart/>
        </Box>
    </Box>
  )
}

export default Breakdown