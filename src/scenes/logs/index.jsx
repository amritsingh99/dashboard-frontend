import React, { useState, useEffect } from 'react'
import Header from 'components/Header'
import { Box, useTheme, FormControl, MenuItem, InputLabel, Select } from '@mui/material'
import { useGetLogsQuery, useGetTransactionsQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'
import { useSignOut } from 'react-auth-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthHeader } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'


const Logs = () => {

    const signOut = useSignOut()

    const auth = useAuthUser()
    const theme = useTheme()

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(20)
    const [sort, setSort] = useState(null)
    const [search, setSearch] = useState("")

    const [searchInput, setSearchInput] = useState("")

    const columns = [
        {
            field: "logTYPE",
            headerName : "Type",
            flex: 0.3,
            headerAlign: 'center',
            align : 'center',
            sortable: false
        },
        {
            field: "logCURRENTPICK",
            headerName : "Current Pick",
            flex: 0.3,
            sortable: false
        },
        {
            field: "logTOTALPICKS",
            headerName : "Total Picks",
            flex: 0.3,
            sortable: false
        },
        {
            field: "logDESIGN",
            headerName : "Design",
            flex: 0.3,
        },
        {
            field: "logTOTALREPEAT",
            headerName : "Total Repeat",
            flex: 0.3,
        },
        {
            field: "logMESSAGE",
            headerName : "Message",
            flex: 0.5
        },
        {
            field: "logTIME",
            headerName : "Time",
            flex: 0.5
        },
        {
            field: "logTOTALPICKSWOVEN",
            headerName : "Total Picks Woven",
            flex: 0.5,
        },
    ]
    const [view, setView] = useState(auth().machines[0].toString())

    const { data, isLoading, isError, error } = useGetLogsQuery({
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search,
        machine_id: view
    })

    if (!isLoading && data) {
        console.log("🚀 ~ file: index.jsx:88 ~ Logs ~ data:", data)
    }
    
    // console.log("🚀 ~ file: index.jsx:88 ~ Logs ~ auth().machines[0]:", auth().machines[0])
    
    // useEffect(() => {
    //     if (isError) {
    //         if (error.status == 401) {
    //             console.log("🚀 ~ file: index.jsx:98 ~ useEffect ~ error.originalStatus:", error.originalStatus)
    //             console.log("🚀 ~ file: index.jsx:98 ~ useEffect ~ error.originalStatus:", error)
    //             signOut()
    //         }
    //     }
    // }, [isError])

    // console.log((data && data.logs[0].logTIME))
    // if (!isLoading) {
    //     const dates = data.logs.map((log) => (new Date(log.logTIME)).toUTCString())
    //     console.log(dates)
    // }
    
    return (
        <Box m={"1.5rem 2.5rem"}>
            <Header title="LOGS" subtitle="Production Logs"/>
            <FormControl sx={{ mt: "1rem", width: "10%" }}>
                <InputLabel>View</InputLabel>
                <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                    
                    {/* <MenuItem value="units"></MenuItem> */}
                    {
                        auth().machines.map((machine_id) => {
                            // console.log("🚀 ~ file: index.jsx:114 ~ auth ~ machine_id:", machine_id)                            
                            return <MenuItem  key={machine_id.toString()} value={machine_id.toString()}>{machine_id}</MenuItem>
                        })
                    }

                </Select>
            </FormControl>
            <Box height={"80vh"}
                sx={{
                    "& .MuiDataGrid-root" : {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell" : {
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-columnHeaders" : {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderBottom: "none"        
                    },
                    "& .MuiDataGrid-virtualScroller" : {
                        backgroundColor: theme.palette.primary.light,
                    },
                    "& .MuiDataGrid-footerContainer" : {
                        backgroundColor: theme.palette.background.alt,
                        color: theme.palette.secondary[100],
                        borderTop: "none"
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text" : {
                        color: `${theme.palette.secondary[200]} !important`
                    }
                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    getRowId={(row) => row.logID}
                    rows={(data && data.logs) || []}
                    columns={columns}
                    row
                    rowsPerPageOptions={[20, 50, 100]}
                    page={page}
                    pageSize={pageSize}
                    rowCount={(data && data.total) || 0}
                    pagination
                    paginationMode="server"
                    sortingMode="server"
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    onSortModelChange={(newSortModel) => {
                            // console.log(...newSortModel) 
                            setSort(...newSortModel)
                            // console.log(sort)
                        }}
                    components={{
                        Toolbar: DataGridCustomToolbar
                    }}
                    componentsProps={{
                        toolbar: { searchInput, setSearchInput, setSearch}
                    }}
                    hideFooterSelectedRowCount={true}
                >
                </DataGrid>
            </Box>            
        </Box>    
    )
}

export default Logs