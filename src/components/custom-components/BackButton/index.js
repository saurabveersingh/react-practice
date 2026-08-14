import PropTypes from "prop-types"

// !definition of component
/**
 *
 * @param props --> onClick and className
 * @description --> Allows user to navigate back
 * @returns Back Button component
 */
// ! component

const BackButton = (props) => {
  return (
    <button
      className={`mx-3 bg-black text-white px-3 py-1 br-10px ${props.className ? props.className : ""}`}
      onClick={props.onClick}
    >
      {"< Back"}
    </button>
  )
}

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default BackButton
