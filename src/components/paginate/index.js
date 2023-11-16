import PropTypes from "prop-types"

// !definition of component
/**
 *
 * @param props --> currentPage, setCurrentPage and maxPage
 * @description --> keeps track of active page
 * @returns Paginate component
 */
// ! component

const Paginate = (props) => {
  return (
    <div className="d-flex align-items-center prevent-select">
      <p className="p-1 mx-2 pointer" onClick={() => props.setCurrentPage(props.currentPage > 1 ? props.currentPage - 1 : props.currentPage)}>
        {"<"}
      </p>
      <p
        className={`px-2 mx-2 circle pointer ${props.currentPage === 1 ? `bg-blue border-grey text-white` : `border-black`}`}
        onClick={() => props.setCurrentPage(1)}
      >
        1
      </p>
      {props.currentPage >= 5 && props.maxPage > 5 && !(props.maxPage === 5 && props.currentPage === 5) && <p className="px-2 pointer">...</p>}
      {(props.currentPage < 5 || (props.maxPage === 5 && props.currentPage === 5)) && (
        <>
          {props.maxPage >= 2 && (
            <p
              className={`px-2 mx-2 circle pointer ${props.currentPage === 2 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(2)}
            >
              2
            </p>
          )}
          {props.maxPage >= 3 && (
            <p
              className={`px-2 mx-2 circle pointer ${props.currentPage === 3 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(3)}
            >
              3
            </p>
          )}
          {props.maxPage >= 4 && (
            <p
              className={`px-2 mx-2 circle pointer ${props.currentPage === 4 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(4)}
            >
              4
            </p>
          )}
          {props.maxPage >= 5 && (
            <p
              className={`px-2 mx-2 circle pointer ${props.currentPage === 5 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(5)}
            >
              5
            </p>
          )}
        </>
      )}
      {props.currentPage < props.maxPage - 3 && props.currentPage >= 5 && (
        <>
          <p className={`px-2 mx-2 circle pointer border-black`} onClick={() => props.setCurrentPage(props.currentPage - 1)}>
            {props.currentPage - 1}
          </p>
          <p className={`px-2 mx-2 circle pointer bg-blue border-grey text-white`}>{props.currentPage}</p>
          <p className={`px-2 mx-2 circle pointer border-black`} onClick={() => props.setCurrentPage(props.currentPage + 1)}>
            {props.currentPage + 1}
          </p>
        </>
      )}
      {(props.currentPage < props.maxPage - 3 || (props.currentPage < 5 && props.maxPage > 5)) && props.maxPage !== 5 && <p className="px-2 pointer">...</p>}
      {props.currentPage >= props.maxPage - 3 && props.maxPage > 5 && props.currentPage >= 5 && (
        <>
          <p className={`px-2 mx-2 circle pointer border-black`} onClick={() => props.setCurrentPage(props.maxPage - 4)}>
            {props.maxPage - 4}
          </p>
          <p
            className={`px-2 mx-2 circle pointer ${props.currentPage === props.maxPage - 3 ? `bg-blue border-grey text-white` : `border-black`}`}
            onClick={() => props.setCurrentPage(props.maxPage - 3)}
          >
            {props.maxPage - 3}
          </p>
          <p
            className={`px-2 mx-2 circle pointer ${props.currentPage === props.maxPage - 2 ? `bg-blue border-grey text-white` : `border-black`}`}
            onClick={() => props.setCurrentPage(props.maxPage - 2)}
          >
            {props.maxPage - 2}
          </p>
          <p
            className={`px-2 mx-2 circle pointer ${props.currentPage === props.maxPage - 1 ? `bg-blue border-grey text-white` : `border-black`}`}
            onClick={() => props.setCurrentPage(props.maxPage - 1)}
          >
            {props.maxPage - 1}
          </p>
        </>
      )}
      {props.maxPage > 5 && (
        <p
          className={`px-2 mx-2 circle pointer ${props.currentPage === props.maxPage ? `bg-blue border-grey text-white` : `border-black`}`}
          onClick={() => props.setCurrentPage(props.maxPage)}
        >
          {props.maxPage}
        </p>
      )}
      <p className="p-1 mx-2 pointer" onClick={() => props.setCurrentPage(props.currentPage < props.maxPage ? props.currentPage + 1 : props.currentPage)}>
        {">"}
      </p>
    </div>
  )
}

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired,
}

export default Paginate
