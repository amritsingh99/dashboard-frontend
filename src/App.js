import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Logs from "scenes/logs"
import Customers from "scenes/customers"
import Transactions from "scenes/transactions"
import Geography from "scenes/geography"
import Overview from "scenes/overview"
import Daily from "scenes/daily"
import Monthly from "scenes/monthly"
import Breakdown from "scenes/breakdown"
import Admin from "scenes/admin"
import Performance from "scenes/performance"
import ErrorBreakdown from 'scenes/errorbreakdown'
import Login from "scenes/login";
import { RequireAuth, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useGetTokenStateQuery } from "state/api";

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const PrivateRoute = ({ Component }) => {

    const { data, isLoading, isError, error } = useGetTokenStateQuery()
    const isAuthenticated = useIsAuthenticated()

    const signOut = useSignOut()

    // useEffect(() => {
    //   if (isError) {
    //       if (error.status == 401) {
    //           console.log("🚀 ~ file: App.js:37 ~ useEffect ~ error.status:", error.status)
    //           localStorage.removeItem('token')
    //           signOut()
    //       }
    //   }
    // }, [isError])    

    let auth = isAuthenticated()

    return auth ? <Component /> : <Navigate to='/login'/>
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route element={<PrivateRoute Component={Layout} />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/logs" element={<Logs/>} />
              <Route path="/customers" element={<Customers/>} />
              <Route path="/transactions" element={<Transactions/>} />
              <Route path="/geography" element={<Geography/>} />
              <Route path="/overview" element={<Overview/>} />
              <Route path="/daily" element={<Daily/>} />
              <Route path="/monthly" element={<Monthly/>} />
              <Route path="/breakdown" element={<ErrorBreakdown/>} />
              <Route path="/error" element={<Breakdown/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/performance" element={<Performance/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;