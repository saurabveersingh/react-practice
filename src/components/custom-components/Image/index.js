import React, { useContext } from "react"
import PropTypes from "prop-types"

import { DeviceContext } from "../../../stores/global/DeviceStore"

/**
 * Component to show image.
 * @param {object} props
 * @param {string} props.src - Image source
 * @param {string} props.alt - Image alt
 * @param {string} props.className - Image class name
 * @param {Object} props.style - Image style
 * @param {string} props.title - title of Image
 * @param {function} props.onClick - Image onClick func
 * @param {string} props.loading - lazy load the image (values: lazy/eager)
 * @param {function} props.onLoad - onLoad event handler a function if passed will be called
 * @param {any} props.width - width of Image
 * @param {any} props.height - height of Image
 * @returns {React.ReactElement} Image component.
 */

const Image = (props) => {
  const Device = useContext(DeviceContext)
  let imgProps = {
    src: props.src,
    alt: props.alt,
    loading: props?.loading ?? "eager",
    className: props?.className,
    style: props?.style,
    title: props?.title,
    onClick: props?.onClick,
    onLoad: (e) => {
      props?.onLoad && props.onLoad(e)
    },
  }
  if (props?.width) {
    imgProps["width"] = Device.isBigScreen ? props.width * 2 : props.width
  }
  if (props?.height) {
    imgProps["height"] = Device.isBigScreen ? props.height * 2 : props.height
  }
  return <img {...imgProps} />
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.string,
  onLoad: PropTypes.func,
  width: PropTypes.any,
  height: PropTypes.any,
}

Image.defaultProps = {
  alt: "some image",
}

export default Image
