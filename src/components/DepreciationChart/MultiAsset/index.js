import { Fragment } from "react"
import PropTypes from "prop-types"

// !definition of component
/**
 *
 * @param props --> assets, from, to and decimal
 * @description --> Displays Depreciation Chart
 * @returns Depreciation Chart component
 */
// ! component

const MultiAsset = (props) => {
  const from = parseInt(props.from)
  const to = parseInt(props.to)
  const total = new Array((to - from) * 2 + 1).fill(0)
  // const assets = props.assets
  const assets = [
    {
      name: "Enfield",
      value: 10041,
      rate: 15,
    },
    {
      name: "Mobile",
      value: 13636,
      rate: 15,
    },
    {
      name: "Galaxy E7 Smartphone",
      value: 11914,
      rate: 15,
    },
    {
      name: "Shop No. 9 Mistubshi A/C",
      value: 54000,
      rate: 15,
    },
    {
      name: "Shop No. 9 Voltas Split A/C",
      value: 20350,
      rate: 15,
    },
    {
      name: "Shop No. 9 Inverter & Batteries",
      value: 19116,
      rate: 15,
    },
    {
      name: "Shop No.9 Camera Setup",
      value: 55500,
      rate: 15,
    },
    {
      name: "Shop No.9 Furniture",
      value: 37206,
      rate: 10,
    },
    {
      name: "Shop No. 9 Pool Tables",
      value: 137959,
      rate: 10,
    },
    {
      name: "Shop No. 9 Building",
      value: 665000,
      rate: 10,
    },
  ]

  return (
    <table className="overflow-scroll">
      <tr>
        <th>Year</th>
        {Array.from({ length: to - from }, (x, i) => `${i + from} - ${i + from + 1}`).map((curr) => {
          return (
            <th colSpan={2} key={curr}>
              {curr}
            </th>
          )
        })}
        <th>{to}</th>
      </tr>
      <tr>
        <th>Asset</th>
        {Array.from({ length: to - from }, (x, i) => `${i + from} - ${i + from + 1}`).map((curr, index) => {
          return (
            <Fragment key={`${index}-${curr}`}>
              <th>Value</th>
              <th>Depreciation</th>
            </Fragment>
          )
        })}
        <th>Final Value</th>
      </tr>
      {assets.map((asset, index) => {
        let value = parseInt(asset.value)

        const updateFinalValue = () => {
          total[total.length - 1] += value
          return value
        }

        return (
          <tr key={`${index}-${asset.name}`}>
            <th>{asset.name}</th>
            {Array.from({ length: to - from }, (x, i) => `${i + from} - ${i + from + 1}`).map((curr, index) => {
              let oldValue = value
              let dep = Math.round((value * asset.rate * Math.pow(10, props.decimal)) / 100) / Math.pow(10, props.decimal)
              value = Math.round((value - dep) * Math.pow(10, props.decimal)) / Math.pow(10, props.decimal)
              total[index * 2] += oldValue
              total[index * 2 + 1] += dep
              return (
                <Fragment key={`${index}-${asset.name}-${curr}`}>
                  <td>{oldValue}</td>
                  <td>{dep}</td>
                </Fragment>
              )
            })}
            <td>{updateFinalValue()}</td>
          </tr>
        )
      })}
      <tr>
        <th>Total</th>
        {total.map((t, index) => {
          return <td key={`${index}-${t}`}>{t}</td>
        })}
      </tr>
    </table>
  )
}

MultiAsset.propTypes = {
  value: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  decimal: PropTypes.number.isRequired,
}

export default MultiAsset
