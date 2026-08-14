import { useContext, useEffect, useState } from "react"

import Input from "components/custom-components/Input"
import BackButton from "components/custom-components/BackButton"
import MultiAsset from "components/DepreciationChart/MultiAsset"

import useEffectOnUpdate from "utility/custom-hooks/useEffectOnUpdate"

import { DeviceContext } from "stores/global/DeviceStore"
import { MutableContext } from "stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE } from "stores/global/MutableStore/MutableActions"

// !definition of component
/**
 *
 * @description --> Multi Asset Depreciation Charts page of the website
 * @returns Multi Asset Depreciation Charts page
 */
// ! component

const MultiAssetDepreciationChart = () => {
  const [page, setPage] = useState(0)
  const [assets, setAssets] = useState([])
  const [name, setName] = useState("")
  const [value, setValue] = useState(0)
  const [rate, setRate] = useState(10)
  const [from, setFrom] = useState(2020)
  const [to, setTo] = useState(2030)
  const [decimal, setDecimal] = useState(0)

  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)

  useEffect(() => {
    if (localStorage.getItem("assets") && localStorage.getItem("assets").length > 0) {
      setAssets(JSON.parse(localStorage.getItem("assets")))
      console.log(localStorage.getItem("assets"))
    }
  }, [])

  useEffectOnUpdate(() => {
    localStorage.setItem("assets", JSON.stringify(assets))
  }, [assets])

  const updateAssets = (e) => {
    e.preventDefault()
    setAssets((assets) => [...assets, { name: name, value: value, rate: rate }])
    setName("")
    setValue(0)
  }

  const deleteAsset = (targetIndex) => {
    setAssets((assets) => assets.filter((asset, index) => index !== targetIndex))
  }

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
      nextPage()
    }
  }

  const nextPage = () => setPage((page) => page + 1)
  const prevPage = () => setPage((page) => page - 1)

  return (
    <>
      {page > 0 ? <BackButton onClick={prevPage} className="w-10 ms-5" /> : <div className="p-4"></div>}
      <div className={`d-flex p-5 mb-0 overflow-scroll`}>
        {page === 0 ? (
          <form className={`me-3 mb-3 d-flex flex-column ${Device.isMobile ? `gap-2` : `w-30 gap-4`}`} onSubmit={updateAssets}>
            <Input label="Asset Name" type="text" value={name} setValue={setName} compact={true} placeholder={"Asset Name"} />
            <Input label="Asset Value" type="number" value={value} setValue={setValue} minValue={0} compact={true} />
            <Input label="Depreciation Rate" type="number" value={rate} setValue={setRate} minValue={0} compact={true} />
            <button className="mx-3 bg-black text-white px-3 py-1 br-10px">Add Asset</button>
            <button type="button" className="mx-3 bg-black text-white px-3 py-1 br-10px" onClick={nextPage}>
              Next
            </button>
          </form>
        ) : page === 1 ? (
          <form className={`me-3 mb-3 d-flex flex-column ${Device.isMobile ? `gap-2` : `w-30 gap-4`}`} onSubmit={validateInput}>
            <Input label="From Year" type="number" value={from} setValue={setFrom} minValue={1920} compact={true} />
            <Input label="To Year" type="number" value={to} setValue={setTo} minValue={1921} compact={true} />
            <Input label="Decimal" type="number" value={decimal} setValue={setDecimal} minValue={0} compact={true} />
            <button className="mx-3 bg-black text-white px-3 py-1 br-10px">Go</button>
          </form>
        ) : (
          <div className="d-flex flex-column w-90">
            <MultiAsset assets={assets} from={from} to={to} decimal={decimal} />
          </div>
        )}
        {assets.length > 0 && page < 2 && (
          <table>
            <tr>
              <th>S.No</th>
              <th>Asset</th>
              <th>Value</th>
              <th>%</th>
              <th>Delete</th>
            </tr>
            {assets.map((asset, index) => {
              return (
                <tr key={`${index}-${asset.name}`}>
                  <td>{index + 1}</td>
                  <td>{asset.name}</td>
                  <td>{asset.value}</td>
                  <td>{asset.rate}</td>
                  <td
                    className="pointer"
                    onClick={() => {
                      deleteAsset(index)
                    }}
                  >
                    ❌
                  </td>
                </tr>
              )
            })}
          </table>
        )}
      </div>
    </>
  )
}

export default MultiAssetDepreciationChart
