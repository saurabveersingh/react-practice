import { useContext, useState } from "react"

import Paginate from "components/paginate"

import { DeviceContext } from "stores/global/DeviceStore"
import { MutableContext } from "stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE } from "stores/global/MutableStore/MutableActions"

// !definition of component
/**
 *
 * @description --> Pagination page of the website
 * @returns Pagination page
 */
// ! component

const Pagination = () => {
  const [showComponent, setShowComponent] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(10)
  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)

  const valdateInput = (e) => {
    e.preventDefault()
    if (currentPage < 1) {
      dispatch({ type: TOAST_MESSAGE, payload: { type: "error", message: "current page cannot be less than 1" } })
    } else if (currentPage > maxPage) {
      dispatch({ type: TOAST_MESSAGE, payload: { type: "error", message: "current page cannot be more than max page" } })
    } else {
      setShowComponent(true)
    }
  }

  return (
    <div className="mt-5">
      {!showComponent && (
        <form className={`me-3 mb-3 ${Device.isMobile ? `d-flex flex-column gap-2` : ``}`} onSubmit={valdateInput}>
          <div className={`${Device.isMobile ? `d-flex justify-content-between` : `d-inline`}`}>
            <label className="mx-3" htmlFor="current-page-input">
              Current Page:
            </label>
            <input
              id="current-page-input"
              name="current-page-input"
              className="ms-2"
              type="number"
              value={currentPage}
              onChange={(e) => {
                setCurrentPage(e.target.value)
              }}
            />
          </div>
          <div className={`${Device.isMobile ? `d-flex justify-content-between` : `d-inline`}`}>
            <label className="mx-3" htmlFor="max-page-input">
              Max Page:
            </label>
            <input
              id="max-page-input"
              name="max-page-input"
              className="ms-2"
              type="number"
              value={maxPage}
              onChange={(e) => {
                setMaxPage(e.target.value)
              }}
            />
          </div>
          <button className="mx-3 bg-black text-white px-3 py-1 br-10px">Go</button>
        </form>
      )}
      {showComponent && (
        <>
          <button
            className="mx-3 mb-4 bg-black text-white px-3 py-1 br-10px"
            onClick={() => {
              setShowComponent(false)
              setCurrentPage(1)
            }}
          >
            {"< Back"}
          </button>
          <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />
        </>
      )}
    </div>
  )
}

export default Pagination
