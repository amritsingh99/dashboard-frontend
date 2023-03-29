import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { useAuthHeader } from 'react-auth-kit'
import { store } from '../index.js'

export const api = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers) => {
            const state = store.getState() 
            console.log("🚀 ~ file: api.js:10 ~ state:", state)
            // const token = state.auth.token
            const token = localStorage.getItem('token')
            console.log("🚀 ~ file: api.js:11 ~ token:", token)
            
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
              headers.set('x-access-token', token)
            }
        
            return headers
          },
    }),
    reducerPath: "adminApi",
    tagTypes: [ "User", "Products", "Customers", "Transactions", "Geography", 
                "Sales", "Admins", "Performance", 'Dashboard', 'Logs', 'Daily', 'LatestDate',
                'Errors', 'VerifyToken' ],
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query : () => "client/products",
            providesTags: ["Products"]
        }),
        getCustomers: build.query({
            query : () => "client/customers",
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query : ({page, pageSize, sort, search}) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query : () => "sales/sales",
            providesTags : ["Sales"]
        }),
        getAdmins : build.query({
            query : () => "management/admins",
            providesTags: ["Admins"]
        }),
        getUserPerformance : build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboard : build.query({
            query: () => 'general/dashboard',
            providesTags: ['Dashboard']
        }),
        getLogs : build.query({
            query : ({page, pageSize, sort, search, machine_id}) => ({
                url: "production/logs",
                method: "GET",
                params: { page, pageSize, sort, search, machine_id},
            }),
            providesTags: ['Logs']
        }),
        getDailyInsights : build.query({
            query : ({ startDate, endDate, machine_id }) => ({
                url : 'insights/daily',
                method: "GET",
                params : { startDate, endDate, machine_id }
            }),
            providesTags : ["Daily"]
        }),
        getLatestDate : build.query({
            query : ({ machine_id }) => ({
                url : 'insights/latestDate',
                method: "GET",
                params : { machine_id }
            }),
            providesTags : ['LatestDate']
        }),
        getErrors : build.query({
            query : ({ startDate, endDate, machine_id }) => ({
                url : "insights/errors",
                method: 'GET',
                params : { startDate, endDate, machine_id }
            }),
            providesTags : ['Errors']
        }),
        getTokenState : build.query({
            query : () => 'api/v1/checkToken',
            providesTags: ['VerifyToken']
        })
    })
})

export const { 
                useGetUserQuery, 
                useGetProductsQuery, 
                useGetCustomersQuery, 
                useGetTransactionsQuery, 
                useGetGeographyQuery,
                useGetSalesQuery,
                useGetAdminsQuery,
                useGetUserPerformanceQuery,
                useGetDashboardQuery,
                useGetLogsQuery,
                useGetDailyInsightsQuery,
                useGetLatestDateQuery,
                useGetErrorsQuery,
                useGetTokenStateQuery
            } = api;