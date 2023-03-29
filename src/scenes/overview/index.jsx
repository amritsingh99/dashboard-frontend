import React, { useState } from 'react'
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material'
import Header from "components/Header"
import OverviewChart from "components/OverviewChart";

const Overview = () => {
    const [view, setView] = useState("units")

  return (
    <Box m="1.5rem 2.5rem" border="solid black 0px">
        <Header title={"Overview"} subtitle={"Overview of general revenue and profit"}/>
        <Box display="flex" flexDirection={"column"} width="100%" height="75vh" border="solid black 0px">
            <FormControl sx={{ mt: "1rem", width: "10%" }}>
                <InputLabel>View</InputLabel>
                <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="units">Units</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={view} />
        </Box>
    </Box>
  )
}

export default Overview