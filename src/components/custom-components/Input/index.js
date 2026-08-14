import { useContext } from "react"
import PropTypes from "prop-types"

import { DeviceContext } from "stores/global/DeviceStore"

// !definition of component
/**
 *
 * @param props --> lable, type, value, setValue, placeholder, minValue, maxValue and className
 * @description --> Take Input from user
 * @returns Input component
 */
// ! component

const Input = (props) => {
  const Device = useContext(DeviceContext)

  const handleChange = (e) => {
    const val = e.target.value
    props.setValue(val)
  }

  return (
    <div className={`${props.compact || Device.isMobile ? `d-flex justify-content-between` : `d-inline`}`}>
      <label className="mx-3" htmlFor={`${props.label}-input`}>
        {props.label}:
      </label>
      <input
        id={`${props.label}-input`}
        name={`${props.label}-input`}
        className="ms-2"
        type={props.type}
        value={props.value}
        onChange={handleChange}
        min={props.minValue}
        max={props.maxValue}
        placeholder={props.placeholder}
      />
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.any,
  minValue: PropTypes.any,
  maxValue: PropTypes.any,
  className: PropTypes.string,
}

export default Input
