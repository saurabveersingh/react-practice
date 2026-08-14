import { NavLink, Outlet } from "react-router-dom"

const DepreciationChartNav = () => {
  const navlinkClassName = ({ isActive }) => {
    return `fw-500 fs-16 p-2 me-2 ${isActive ? "underline fw-700" : ""}`
  }

  return (
    <div>
      <nav className="d-flex m-5">
        <NavLink to="/depreciation-charts" end className={navlinkClassName}>
          Single Asset
        </NavLink>
        <NavLink to="/depreciation-charts/multi-asset" className={navlinkClassName}>
          Multi Asset
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
}

export default DepreciationChartNav
