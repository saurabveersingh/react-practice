import React from "react"
import { Outlet } from "react-router-dom"

import ToastMessage from "components/ToastMessage"

import DeviceStore from "stores/global/DeviceStore"
import MutableStore from "stores/global/MutableStore/MutableStore"

// !definition of component
/**
 *
 * @description --> Layout for all pages of the website
 * @returns Layout wrapper Component
 */
// ! component

const Layout = (props) => {
  return (
    <DeviceStore>
      <MutableStore>
        <main>
          <ToastMessage />
          <Outlet />
        </main>
      </MutableStore>
    </DeviceStore>
  )
}

export default Layout
