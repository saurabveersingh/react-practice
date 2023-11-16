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
  const currentPage = parseInt(props.currentPage)
  const maxPage = parseInt(props.maxPage)
  return (
    <div className="d-flex align-items-center prevent-select">
      <p className="p-1 mx-2 pointer" onClick={() => props.setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
        {"<"}
      </p>
      <p
        className={`px-2 mx-2 circle pointer ${currentPage === 1 ? `bg-blue border-grey text-white` : `border-black`}`}
        onClick={() => props.setCurrentPage(1)}
      >
        1
      </p>
      {currentPage >= 5 && maxPage > 5 && !(maxPage === 5 && currentPage === 5) && <p className="px-2 pointer">...</p>}
      {(currentPage < 5 || (maxPage === 5 && currentPage === 5)) && (
        <>
          {maxPage >= 2 && (
            <p
              className={`px-2 mx-2 circle pointer ${currentPage === 2 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(2)}
            >
              2
            </p>
          )}
          {maxPage >= 3 && (
            <p
              className={`px-2 mx-2 circle pointer ${currentPage === 3 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(3)}
            >
              3
            </p>
          )}
          {maxPage >= 4 && (
            <p
              className={`px-2 mx-2 circle pointer ${currentPage === 4 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(4)}
            >
              4
            </p>
          )}
          {maxPage >= 5 && (
            <p
              className={`px-2 mx-2 circle pointer ${currentPage === 5 ? `bg-blue border-grey text-white` : `border-black`}`}
              onClick={() => props.setCurrentPage(5)}
            >
              5
            </p>
          )}
        </>
      )}
      {currentPage < maxPage - 3 && currentPage >= 5 && (
        <>
          <p className={`px-2 mx-2 circle pointer border-black`} onClick={() => props.setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </p>
          <p className={`px-2 mx-2 circle pointer bg-blue border-grey text-white`}>{currentPage}</p>
          <p className={`px-2 mx-2 circle pointer border-black`} onClick={() => props.setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </p>
        </>
      )}
      {(currentPage < maxPage - 3 || (currentPage < 5 && maxPage > 5)) && maxPage !== 5 && <p className="px-2 pointer">...</p>}
      {currentPage >= maxPage - 3 && maxPage > 5 && currentPage >= 5 && (
        <>
          <p className={`px-2 mx-2 circle pointer border-black`} onClick={() => props.setCurrentPage(maxPage - 4)}>
            {maxPage - 4}
          </p>
          <p
            className={`px-2 mx-2 circle pointer ${currentPage === maxPage - 3 ? `bg-blue border-grey text-white` : `border-black`}`}
            onClick={() => props.setCurrentPage(maxPage - 3)}
          >
            {maxPage - 3}
          </p>
          <p
            className={`px-2 mx-2 circle pointer ${currentPage === maxPage - 2 ? `bg-blue border-grey text-white` : `border-black`}`}
            onClick={() => props.setCurrentPage(maxPage - 2)}
          >
            {maxPage - 2}
          </p>
          <p
            className={`px-2 mx-2 circle pointer ${currentPage === maxPage - 1 ? `bg-blue border-grey text-white` : `border-black`}`}
            onClick={() => props.setCurrentPage(maxPage - 1)}
          >
            {maxPage - 1}
          </p>
        </>
      )}
      {maxPage > 5 && (
        <p
          className={`px-2 mx-2 circle pointer ${currentPage === maxPage ? `bg-blue border-grey text-white` : `border-black`}`}
          onClick={() => props.setCurrentPage(maxPage)}
        >
          {maxPage}
        </p>
      )}
      <p className="p-1 mx-2 pointer" onClick={() => props.setCurrentPage(currentPage < maxPage ? currentPage + 1 : currentPage)}>
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
