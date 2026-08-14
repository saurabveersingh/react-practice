import { useState, useEffect } from "react"
import useEffectOnUpdate from "./useEffectOnUpdate"

const useToggle = (initialValue = false, onToggle = () => {}) => {
  const [on, setOn] = useState(initialValue)

  function toggle() {
    setOn((prevOn) => !prevOn)
  }

  useEffectOnUpdate(onToggle, [on])

  return [on, toggle]
}

export default useToggle
