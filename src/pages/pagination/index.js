import { useContext } from "react"

import { DeviceContext } from "stores/global/DeviceStore"

// !definition of component
/**
 *
 * @description --> Pagination page of the website
 * @returns Pagination page
 */
// ! component

const Pagination = () => {
  const Device = useContext(DeviceContext)
  return (
    <div className="ms-3">
      <a href="/pagination">Pagination</a>
    </div>
  )
}

export default Pagination
