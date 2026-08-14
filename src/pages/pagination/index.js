import { useContext, useState } from "react"

import Paginate from "components/paginate"
import Input from "components/custom-components/Input"
import BackButton from "components/custom-components/BackButton"

import { DeviceContext } from "stores/global/DeviceStore"
import { MutableContext } from "stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE } from "stores/global/MutableStore/MutableActions"
import useToggle from "utility/custom-hooks/useToggle"

// !definition of component
/**
 *
 * @description --> Pagination page of the website
 * @returns Pagination page
 */
// ! component

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [maxPage, setMaxPage] = useState(10)
  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)

  const [showComponent, toggleShowComponent] = useToggle()

  const validateInput = (e) => {
    e.preventDefault()
    if (currentPage > maxPage) {
      dispatch({
        type: TOAST_MESSAGE,
        payload: { type: "error", message: "current page cannot be more than max page" },
      })
    } else {
      toggleShowComponent()
    }
  }

  return (
    <div className="mt-5">
      {!showComponent ? (
        <form className={`me-3 mb-3 ${Device.isMobile ? `d-flex flex-column gap-2` : ``}`} onSubmit={validateInput}>
          <Input label="Current Page" type="number" value={currentPage} setValue={setCurrentPage} minValue={0} />
          <Input label="Max Page" type="number" value={maxPage} setValue={setMaxPage} minValue={0} />
          <button className="mx-3 bg-black text-white px-3 py-1 br-10px">Go</button>
        </form>
      ) : (
        <>
          <BackButton
            onClick={() => {
              toggleShowComponent()
              setCurrentPage(1)
            }}
          />
          <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage} />
        </>
      )}
    </div>
  )
}

export default Pagination
