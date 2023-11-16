import { TOAST_MESSAGE } from "./MutableActions"

// !definition of component
/**
 *
 * @description --> Used to map actions and there response for Mutable Store
 * @returns Global state update
 */
// ! component

const MutableReducer = (state, action) => {
  switch (action.type) {
    case TOAST_MESSAGE:
      return {
        ...state,
        toast_message: action.payload,
      }
    default:
      return state
  }
}

export default MutableReducer
