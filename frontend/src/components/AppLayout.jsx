import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router'
import { Toaster } from "@/components/ui/sonner"

const AppLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  )
}

export default AppLayout