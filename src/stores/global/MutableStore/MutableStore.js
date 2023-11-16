import { createContext, useReducer } from "react"
import MutableReducer from "./MutableReducer"

// !definition of component
/**
 *
 * @description --> Used for global states that require to be updated
 * @description --> Use this only when necessary as it effects performance.
 * @description --> Components must be wraped in this to access useContext.
 * @returns Global State Provider
 */
// ! component

const initalState = {
  toast_message: { type: "", message: "" },
  // to make more states, add them here and create action in MutableReducer
}

const MutableStore = ({ children }) => {
  const [state, dispatch] = useReducer(MutableReducer, initalState)
  return <MutableContext.Provider value={[state, dispatch]}>{children}</MutableContext.Provider>
}

export const MutableContext = createContext()
export default MutableStore
