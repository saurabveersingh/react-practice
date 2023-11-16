import React from "react"
import PropTypes from "prop-types"

import ToastMessage from "components/ToastMessage"

// !definition of component
/**
 * @param props --> children
 * @description --> Layout for all pages of the website
 * @returns Layout wrapper Component
 */
// ! component

const Layout = (props) => {
  return (
    <React.Fragment>
      <main>
        <ToastMessage />
        {props.children}
      </main>
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
