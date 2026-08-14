import PropTypes from "prop-types"

// !definition of component
/**
 *
 * @param props --> value, rate, from, to and decimal
 * @description --> Displays Single Asset Depreciation Chart
 * @returns Single Asset Depreciation Chart component
 */
// ! component

const SingleAsset = (props) => {
  const from = parseInt(props.from)
  const to = parseInt(props.to)
  let value = props.value

  return (
    <table>
      <tr>
        <th>Year</th>
        <th>
          <p>Value B/d</p>
          <p>(a)</p>
        </th>
        <th>
          <p>Depreciation</p>
          <p>(b)</p>
        </th>
        <th>
          <p>Value c/d</p>
          <p>(a-b)</p>
        </th>
      </tr>
      {Array.from({ length: to - from }, (x, i) => `${i + from} - ${i + from + 1}`).map((curr) => {
        let oldValue = value
        let dep = Math.round((value * props.rate * Math.pow(10, props.decimal)) / 100) / Math.pow(10, props.decimal)
        value = Math.round((value - dep) * Math.pow(10, props.decimal)) / Math.pow(10, props.decimal)
        return (
          <tr key={curr}>
            <td>{curr}</td>
            <td>{oldValue}</td>
            <td>{dep}</td>
            <td>{value}</td>
          </tr>
        )
      })}
    </table>
  )
}

SingleAsset.propTypes = {
  value: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  decimal: PropTypes.number.isRequired,
}

export default SingleAsset
