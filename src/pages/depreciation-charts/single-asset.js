import { useContext, useState } from "react"

import Input from "components/custom-components/Input"
import BackButton from "components/custom-components/BackButton"
import SingleAsset from "components/DepreciationChart/SingleAsset"

import { DeviceContext } from "stores/global/DeviceStore"
import { MutableContext } from "stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE } from "stores/global/MutableStore/MutableActions"

import useToggle from "utility/custom-hooks/useToggle"

// !definition of component
/**
 *
 * @description --> Single Asset Depreciation Charts page of the website
 * @returns Single Asset Depreciation Charts page
 */
// ! component

const SingleAssetDepreciationChart = () => {
  const [value, setValue] = useState(100000)
  const [rate, setRate] = useState(10)
  const [from, setFrom] = useState(2020)
  const [to, setTo] = useState(2030)
  const [decimal, setDecimal] = useState(0)

  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)

  const [showComponent, toggleShowComponent] = useToggle()

  const validateInput = (e) => {
    e.preventDefault()
    if (to < from) {
      dispatch({
        type: TOAST_MESSAGE,
        payload: {
          type: "error",
          message: '"From Year" Must be more than "To Year"',
        },
      })
    } else {
      toggleShowComponent()
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center pt-5">
      {!showComponent ? (
        <form
          className={`me-3 mb-3 d-flex flex-column ${Device.isMobile ? `gap-2` : `w-30 gap-4`}`}
          onSubmit={validateInput}
        >
          <Input label="Asset Value" type="number" value={value} setValue={setValue} minValue={0} compact={true} />
          <Input label="Depreciation Rate" type="number" value={rate} setValue={setRate} minValue={0} compact={true} />
          <Input label="From Year" type="number" value={from} setValue={setFrom} minValue={1920} compact={true} />
          <Input label="To Year" type="number" value={to} setValue={setTo} minValue={1921} compact={true} />
          <Input label="Decimal" type="number" value={decimal} setValue={setDecimal} minValue={0} compact={true} />
          <button className="mx-3 bg-black text-white px-3 py-1 br-10px">Go</button>
        </form>
      ) : (
        <div className="d-flex flex-column w-90">
          <BackButton onClick={toggleShowComponent} className="w-10" />
          <SingleAsset value={value} rate={rate} from={from} to={to} decimal={decimal} />
        </div>
      )}
    </div>
  )
}

export default SingleAssetDepreciationChart
