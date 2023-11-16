import { useContext, useEffect } from "react"

import { MutableContext } from "../../stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE } from "../../stores/global/MutableStore/MutableActions"

import Style from "./style.module.scss"

// !definition of component
/**
 *
 * @description --> provides self dismissed notifictions to notify users without interupting the flow.
 * @description --> Should be part of Layout for global trigger.
 * @returns ToastMessage Component
 */
// ! component

const ToastMessage = () => {
  const [state, dispatch] = useContext(MutableContext)

  const closeAlert = () => {
    dispatch({ type: TOAST_MESSAGE, payload: { type: "", message: "" } })
  }

  useEffect(() => {
    if (state.toast_message.type) {
      setTimeout(closeAlert, 5000)
    }
  }, [state, dispatch])

  return (
    <div className={`position-fixed right-0 fs-18px z-index-max ${Style.alert_box_wrapper}`}>
      {state.toast_message.message && (
        <div
          className={`alert ${
            state.toast_message.type === "success" ? `alert-success` : `alert-danger`
          } alert-dismissible fade show d-flex align-items-center p-2`}
          role="alert"
        >
          <button type="button" className="btn-close position-static pt-2" aria-label="Close" onClick={closeAlert}>
            <span aria-hidden="true" className="d-none">
              ×
            </span>
          </button>
          {state.toast_message.message}
        </div>
      )}
    </div>
  )
}

export default ToastMessage
