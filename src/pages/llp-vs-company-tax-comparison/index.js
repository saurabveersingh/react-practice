import { useContext, useState } from "react"


import Input from "components/custom-components/Input"
import BackButton from "components/custom-components/BackButton"


import { DeviceContext } from "stores/global/DeviceStore"
import { MutableContext } from "stores/global/MutableStore/MutableStore"
import { TOAST_MESSAGE } from "stores/global/MutableStore/MutableActions"



const LLP_TAX = 31.2
const CORPORATE_TAX = 25.168



const LlpVsCompanyTaxComparison = () => {
  const [state, dispatch] = useContext(MutableContext)
  const Device = useContext(DeviceContext)


  const [page, setPage] = useState(0)
  const [numberOfPartners, setNumberOfPartners] = useState(2)


  /*
    partnersData structure:

    [
      [partner1OtherIncome, partner2OtherIncome, ...],
      [partner1ProfitShare, partner2ProfitShare, ...],
      [partner1SalaryShare, partner2SalaryShare, ...]
    ]

    Profit Share and Salary Share are percentages.
  */
  const [partnersData, setPartnersData] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
  ])


  const [comparisonData, setComparisonData] = useState([])

  const [customProfit, setCustomProfit] = useState("")

  /*
    Table view:

    "both"
    "llp"
    "company"
  */
  const [viewMode, setViewMode] = useState("both")



  const nextPage = () => setPage((page) => page + 1)


  const prevPage = () => setPage((page) => page - 1)



  const InitialisePartners = (e) => {
    e.preventDefault()


    const n = Number(numberOfPartners)


    if (n < 2) {
      dispatch({
        type: TOAST_MESSAGE,
        payload: {
          type: "error",
          message: "Number of partners must be more than 1",
        },
      })

      return
    }


    setNumberOfPartners(n)


    setPartnersData(
      Array(3)
        .fill(null)
        .map(() => Array(n).fill(0))
    )


    nextPage()
  }



  const updatePartnerData = (
    categoryIndex,
    partnerIndex,
    value
  ) => {
    setPartnersData((previousData) => {
      const copy = previousData.map(
        (category) => [...category]
      )


      copy[categoryIndex][partnerIndex] = value


      return copy
    })
  }



  /*
    ==========================================
    NEW TAX REGIME
    ==========================================
  */

  const calculateIndividualTax = (income) => {
    const value = Math.max(
      0,
      Number(income) || 0
    )


    let tax = 0


    if (value <= 400000) {

      tax = 0

    } else if (value <= 800000) {

      tax =
        (value - 400000) * 0.05

    } else if (value <= 1200000) {

      tax =
        20000 +
        (value - 800000) * 0.10

    } else if (value <= 1600000) {

      tax =
        60000 +
        (value - 1200000) * 0.15

    } else if (value <= 2000000) {

      tax =
        120000 +
        (value - 1600000) * 0.20

    } else if (value <= 2400000) {

      tax =
        200000 +
        (value - 2000000) * 0.25

    } else {

      tax =
        300000 +
        (value - 2400000) * 0.30
    }


    /*
      Section 87A rebate.
    */

    if (value <= 1200000) {

      tax = Math.max(
        0,
        tax - 60000
      )
    }


    /*
      Marginal relief above ₹12L.
    */

    if (value > 1200000) {

      const incomeAboveRebateLimit =
        value - 1200000


      tax = Math.min(
        tax,
        incomeAboveRebateLimit
      )
    }


    /*
      Health & Education Cess.
    */

    return tax * 1.04
  }



  /*
    ==========================================
    ADDITIONAL TAX
    ==========================================
  */

  const calculateAdditionalTax = (
    baseIncome,
    additionalIncome
  ) => {

    const taxBefore =
      calculateIndividualTax(
        baseIncome
      )


    const taxAfter =
      calculateIndividualTax(
        Number(baseIncome) +
        Number(additionalIncome)
      )


    return Math.max(
      0,
      taxAfter - taxBefore
    )
  }



  /*
    ==========================================
    MAXIMUM PARTNER REMUNERATION
    ==========================================

    90% of first ₹6,00,000
    60% of remaining profit
  */

  const calculateMaximumPartnerSalary = (
    profit
  ) => {

    if (profit <= 0) {
      return 0
    }


    const firstSixLakhs =
      Math.min(
        profit,
        600000
      )


    const remaining =
      Math.max(
        0,
        profit - 600000
      )


    return (
      firstSixLakhs * 0.90 +
      remaining * 0.60
    )
  }



  /*
    ==========================================
    CALCULATE ONE PROFIT ROW
    ==========================================
  */

  const calculateProfitRow = (profit) => {

    const totalPartnerSalaries =
      calculateMaximumPartnerSalary(
        profit
      )


    /*
      Allocate salary according to salary
      share percentage.
    */

    const partnerSalaries =
      partnersData[2].map(
        (percentage) =>
          totalPartnerSalaries *
          (Number(percentage) || 0) /
          100
      )


    /*
      Taxable business profit after
      partner remuneration.
    */

    const taxableProfits =
      Math.max(
        0,
        profit -
        totalPartnerSalaries
      )


    /*
      LLP.
    */

    const llpTax =
      taxableProfits *
      LLP_TAX /
      100


    const llpDistributableProfits =
      Math.max(
        0,
        taxableProfits -
        llpTax
      )


    /*
      Company.

      Partner salaries are deducted before
      calculating corporate tax.
    */

    const corporateTax =
      taxableProfits *
      CORPORATE_TAX /
      100


    const companyDistributableProfits =
      Math.max(
        0,
        taxableProfits -
        corporateTax
      )


    /*
      Partner calculations.
    */

    const partnerResults =
      partnersData[0].map(
        (_, partnerIndex) => {

          const otherIncome =
            Number(
              partnersData[0][
                partnerIndex
              ]
            ) || 0


          const profitSharePercentage =
            Number(
              partnersData[1][
                partnerIndex
              ]
            ) || 0


          const partnerSalary =
            partnerSalaries[
              partnerIndex
            ] || 0


          /*
            Tax on salary.
          */

          const partnerSalaryTax =
            calculateAdditionalTax(
              otherIncome,
              partnerSalary
            )


          /*
            LLP profit share.

            LLP profit share is exempt in
            the partner's hands.
          */

          const partnerLlpProfitShare =
            llpDistributableProfits *
            profitSharePercentage /
            100


          const partnerLlpProfitShareTax =
            0


          /*
            Company profit share.
          */

          const partnerCompanyProfitShare =
            companyDistributableProfits *
            profitSharePercentage /
            100


          /*
            Tax on company profit share.

            Other income + salary have already
            been considered before this income.
          */

          const incomeBeforeCompanyProfit =
            otherIncome +
            partnerSalary


          const partnerCompanyProfitTax =
            calculateAdditionalTax(
              incomeBeforeCompanyProfit,
              partnerCompanyProfitShare
            )


          return {

            salary:
              partnerSalary,

            salaryTax:
              partnerSalaryTax,

            llpProfitShare:
              partnerLlpProfitShare,

            llpProfitShareTax:
              partnerLlpProfitShareTax,

            companyProfitShare:
              partnerCompanyProfitShare,

            companyProfitTax:
              partnerCompanyProfitTax,

          }
        }
      )


    /*
      LLP total tax.
    */

    const totalPartnerSalaryTax =
      partnerResults.reduce(
        (total, partner) =>
          total +
          partner.salaryTax,
        0
      )


    const totalPartnerLlpProfitShareTax =
      partnerResults.reduce(
        (total, partner) =>
          total +
          partner.llpProfitShareTax,
        0
      )


    const totalTaxPaidByPartnersAndLLP =
      llpTax +
      totalPartnerSalaryTax +
      totalPartnerLlpProfitShareTax


    /*
      Company total tax.
    */

    const totalTaxOnCompanyProfit =
      partnerResults.reduce(
        (total, partner) =>
          total +
          partner.companyProfitTax,
        0
      )


    const totalTaxPaidByDirectorsAndCompany =
      corporateTax +
      totalPartnerSalaryTax +
      totalTaxOnCompanyProfit


    return {

      profit,

      totalPartnerSalaries,

      taxableProfits,

      llpTax,

      corporateTax,

      llpDistributableProfits,

      companyDistributableProfits,

      partnerResults,

      totalTaxPaidByPartnersAndLLP,

      totalTaxPaidByDirectorsAndCompany,

    }
  }



  /*
    ==========================================
    CALCULATE STANDARD COMPARISON
    ==========================================
  */

  const calculateComparison = () => {

    const salaryPercentages =
      partnersData[2].map(
        (value) =>
          Number(value) || 0
      )


    const profitSharePercentages =
      partnersData[1].map(
        (value) =>
          Number(value) || 0
      )


    const totalSalaryPercentage =
      salaryPercentages.reduce(
        (total, value) =>
          total + value,
        0
      )


    const totalProfitSharePercentage =
      profitSharePercentages.reduce(
        (total, value) =>
          total + value,
        0
      )


    /*
      Salary shares must total 100%.
    */

    if (
      Math.abs(
        totalSalaryPercentage - 100
      ) > 0.01
    ) {

      dispatch({
        type: TOAST_MESSAGE,
        payload: {
          type: "error",
          message:
            "Partner salary shares must total 100%",
        },
      })

      return
    }


    /*
      Profit shares must total 100%.
    */

    if (
      Math.abs(
        totalProfitSharePercentage - 100
      ) > 0.01
    ) {

      dispatch({
        type: TOAST_MESSAGE,
        payload: {
          type: "error",
          message:
            "Partner profit shares must total 100%",
        },
      })

      return
    }


    const results = []


    /*
      ₹10L → ₹1Cr
      increments of ₹10L.
    */

    for (
      let profit = 1000000;
      profit <= 10000000;
      profit += 1000000
    ) {

      results.push(
        calculateProfitRow(
          profit
        )
      )
    }


    setComparisonData(results)

    nextPage()
  }



  /*
    ==========================================
    ADD CUSTOM PROFIT ROW
    ==========================================
  */

  const addCustomProfitRow = (e) => {
    e.preventDefault()


    const profit =
      Number(customProfit)


    if (
      !Number.isFinite(profit) ||
      profit <= 0
    ) {

      dispatch({
        type: TOAST_MESSAGE,
        payload: {
          type: "error",
          message:
            "Please enter a valid profit amount greater than 0",
        },
      })

      return
    }


    /*
      Prevent duplicate rows.
    */

    const alreadyExists =
      comparisonData.some(
        (row) =>
          Number(row.profit) === profit
      )


    if (alreadyExists) {

      dispatch({
        type: TOAST_MESSAGE,
        payload: {
          type: "error",
          message:
            "A row for this profit amount already exists",
        },
      })

      return
    }


    const newRow =
      calculateProfitRow(
        profit
      )


    setComparisonData(
      (previousData) => [
        ...previousData,
        newRow,
      ]
    )


    setCustomProfit("")
  }



  const formatCurrency = (value) => {

    return `₹${Math.round(
      Number(value) || 0
    ).toLocaleString("en-IN")}`

  }



  return (
    <>
      {page > 0 ? (

        <BackButton
          onClick={prevPage}
          className="w-10 ms-5"
        />

      ) : (

        <div className="p-4"></div>

      )}


      <div className="d-flex p-5 mb-0 overflow-scroll">


        {page === 0 ? (

          <form
            className={`me-3 mb-3 d-flex flex-column ${
              Device.isMobile
                ? "gap-2"
                : "w-30 gap-4"
            }`}
            onSubmit={
              InitialisePartners
            }
          >

            <Input
              label="Number of Partners"
              type="number"
              value={numberOfPartners}
              setValue={
                setNumberOfPartners
              }
              compact={true}
              placeholder="Number of Partners"
            />


            <button
              type="submit"
              className="mx-3 bg-black text-white px-3 py-1 br-10px"
            >
              Next
            </button>

          </form>


        ) : page === 1 ? (

          <form
            className={`me-3 mb-3 d-flex flex-column ${
              Device.isMobile
                ? "gap-2"
                : "w-30 gap-4"
            }`}
            onSubmit={(e) => {

              e.preventDefault()

              calculateComparison()

            }}
          >

            {Array.from({
              length:
                Number(
                  numberOfPartners
                ),
            }).map(
              (_, partnerIndex) => (

                <div
                  key={partnerIndex}
                  className="d-flex flex-column gap-2 mb-4"
                >

                  <h5>
                    Partner{" "}
                    {partnerIndex + 1}
                  </h5>


                  <Input
                    label={`Partner ${
                      partnerIndex + 1
                    } Income from Other Sources`}
                    type="number"
                    value={
                      partnersData[0]?.[
                        partnerIndex
                      ] ?? 0
                    }
                    setValue={(value) =>
                      updatePartnerData(
                        0,
                        partnerIndex,
                        value
                      )
                    }
                    compact={true}
                    placeholder="Income from Other Sources"
                  />


                  <Input
                    label={`Partner ${
                      partnerIndex + 1
                    } Profit Share (%)`}
                    type="number"
                    value={
                      partnersData[1]?.[
                        partnerIndex
                      ] ?? 0
                    }
                    setValue={(value) =>
                      updatePartnerData(
                        1,
                        partnerIndex,
                        value
                      )
                    }
                    compact={true}
                    placeholder="Profit Share %"
                  />


                  <Input
                    label={`Partner ${
                      partnerIndex + 1
                    } Salary Share (%)`}
                    type="number"
                    value={
                      partnersData[2]?.[
                        partnerIndex
                      ] ?? 0
                    }
                    setValue={(value) =>
                      updatePartnerData(
                        2,
                        partnerIndex,
                        value
                      )
                    }
                    compact={true}
                    placeholder="Salary Share %"
                  />

                </div>

              )
            )}


            <button
              type="submit"
              className="mx-3 bg-black text-white px-3 py-1 br-10px"
            >
              Go
            </button>

          </form>


) : (

  <div className="d-flex flex-column w-100">

    {/* ==========================================
        VIEW MODE
        ========================================== */}

    <div
      className={`d-flex gap-4 mb-4 ${
        Device.isMobile
          ? "flex-column gap-2"
          : ""
      }`}
    >

      <label className="d-flex align-items-center gap-2">
        <input
          type="radio"
          name="comparisonView"
          value="both"
          checked={viewMode === "both"}
          onChange={(e) =>
            setViewMode(e.target.value)
          }
        />

        Both
      </label>


      <label className="d-flex align-items-center gap-2">
        <input
          type="radio"
          name="comparisonView"
          value="llp"
          checked={viewMode === "llp"}
          onChange={(e) =>
            setViewMode(e.target.value)
          }
        />

        Only LLP
      </label>


      <label className="d-flex align-items-center gap-2">
        <input
          type="radio"
          name="comparisonView"
          value="company"
          checked={viewMode === "company"}
          onChange={(e) =>
            setViewMode(e.target.value)
          }
        />

        Only Company
      </label>

    </div>



    {/* ==========================================
        TABLE
        ========================================== */}

    <div
      style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "visible",
      }}
    >

      <table
        className="table table-bordered"
        style={{
          width: "max-content",
          minWidth: "100%",
          whiteSpace: "nowrap",
          verticalAlign: "middle",
        }}
      >

        <thead>

          {/* ================================
              FIRST HEADER ROW
              ================================ */}

          <tr>

            {/* Common */}

            <th rowSpan="2">
              Profit
            </th>

            <th rowSpan="2">
              Total Partner Salaries Distributable
            </th>

            <th rowSpan="2">
              Taxable Profits
            </th>


            {/* LLP */}

            {(
              viewMode === "both" ||
              viewMode === "llp"
            ) && (
              <>
                <th rowSpan="2">
                  LLP Tax on Profits
                </th>

                <th rowSpan="2">
                  LLP Distributable Profits
                </th>
              </>
            )}


            {/* Company */}

            {(
              viewMode === "both" ||
              viewMode === "company"
            ) && (
              <>
                <th rowSpan="2">
                  Corporate Tax on Profits
                </th>

                <th rowSpan="2">
                  Company Distributable Profits
                </th>
              </>
            )}


            {/* Partners */}

            {Array.from({
              length: Number(numberOfPartners),
            }).map(
              (_, partnerIndex) => {

                let colSpan = 5

                if (viewMode === "llp") {
                  colSpan = 3
                }

                if (viewMode === "company") {
                  colSpan = 4
                }

                return (
                  <th
                    key={`partner-${partnerIndex}`}
                    colSpan={colSpan}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    Partner {partnerIndex + 1}
                  </th>
                )
              }
            )}


            {/* Total Tax */}

            {(
              viewMode === "both" ||
              viewMode === "llp"
            ) && (
              <th rowSpan="2">
                Total Tax Paid by Partners & LLP
              </th>
            )}


            {(
              viewMode === "both" ||
              viewMode === "company"
            ) && (
              <th rowSpan="2">
                Total Tax Paid by Directors & Company
              </th>
            )}

          </tr>



          {/* ================================
              SECOND HEADER ROW
              ================================ */}

          <tr>

            {Array.from({
              length: Number(numberOfPartners),
            }).map(
              (_, partnerIndex) => {

                if (viewMode === "both") {

                  return [

                    <th
                      key={`salary-${partnerIndex}`}
                    >
                      Salary
                    </th>,

                    <th
                      key={`salary-tax-${partnerIndex}`}
                    >
                      Tax on Salary
                    </th>,

                    <th
                      key={`llp-profit-${partnerIndex}`}
                    >
                      LLP Profit Share
                    </th>,

                    <th
                      key={`company-profit-${partnerIndex}`}
                    >
                      Company Profit Share
                    </th>,

                    <th
                      key={`company-tax-${partnerIndex}`}
                    >
                      Tax on Company Profit
                    </th>,

                  ]
                }


                if (viewMode === "llp") {

                  return [

                    <th
                      key={`salary-${partnerIndex}`}
                    >
                      Salary
                    </th>,

                    <th
                      key={`salary-tax-${partnerIndex}`}
                    >
                      Tax on Salary
                    </th>,

                    <th
                      key={`llp-profit-${partnerIndex}`}
                    >
                      LLP Profit Share
                    </th>,

                  ]
                }


                return [

                  <th
                    key={`salary-${partnerIndex}`}
                  >
                    Salary
                  </th>,

                  <th
                    key={`salary-tax-${partnerIndex}`}
                  >
                    Tax on Salary
                  </th>,

                  <th
                    key={`company-profit-${partnerIndex}`}
                  >
                    Company Profit Share
                  </th>,

                  <th
                    key={`company-tax-${partnerIndex}`}
                  >
                    Tax on Company Profit
                  </th>,

                ]
              }
            )}

          </tr>

        </thead>



        {/* ==========================================
            BODY
            ========================================== */}

        <tbody>

          {comparisonData.map(
            (row, rowIndex) => (

              <tr key={rowIndex}>

                {/* Common */}

                <td>
                  {formatCurrency(row.profit)}
                </td>

                <td>
                  {formatCurrency(
                    row.totalPartnerSalaries
                  )}
                </td>

                <td>
                  {formatCurrency(
                    row.taxableProfits
                  )}
                </td>


                {/* LLP */}

                {(
                  viewMode === "both" ||
                  viewMode === "llp"
                ) && (
                  <>
                    <td>
                      {formatCurrency(
                        row.llpTax
                      )}
                    </td>

                    <td>
                      {formatCurrency(
                        row.llpDistributableProfits
                      )}
                    </td>
                  </>
                )}


                {/* Company */}

                {(
                  viewMode === "both" ||
                  viewMode === "company"
                ) && (
                  <>
                    <td>
                      {formatCurrency(
                        row.corporateTax
                      )}
                    </td>

                    <td>
                      {formatCurrency(
                        row.companyDistributableProfits
                      )}
                    </td>
                  </>
                )}


                {/* ==================================
                    PARTNERS
                    ================================== */}

                {row.partnerResults.map(
                  (partner, partnerIndex) => {

                    if (viewMode === "both") {

                      return [

                        <td
                          key={`salary-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.salary
                          )}
                        </td>,

                        <td
                          key={`salary-tax-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.salaryTax
                          )}
                        </td>,

                        <td
                          key={`llp-profit-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.llpProfitShare
                          )}
                        </td>,

                        <td
                          key={`company-profit-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.companyProfitShare
                          )}
                        </td>,

                        <td
                          key={`company-tax-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.companyProfitTax
                          )}
                        </td>,

                      ]
                    }


                    if (viewMode === "llp") {

                      return [

                        <td
                          key={`salary-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.salary
                          )}
                        </td>,

                        <td
                          key={`salary-tax-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.salaryTax
                          )}
                        </td>,

                        <td
                          key={`llp-profit-${rowIndex}-${partnerIndex}`}
                        >
                          {formatCurrency(
                            partner.llpProfitShare
                          )}
                        </td>,

                      ]
                    }


                    return [

                      <td
                        key={`salary-${rowIndex}-${partnerIndex}`}
                      >
                        {formatCurrency(
                          partner.salary
                        )}
                      </td>,

                      <td
                        key={`salary-tax-${rowIndex}-${partnerIndex}`}
                      >
                        {formatCurrency(
                          partner.salaryTax
                        )}
                      </td>,

                      <td
                        key={`company-profit-${rowIndex}-${partnerIndex}`}
                      >
                        {formatCurrency(
                          partner.companyProfitShare
                        )}
                      </td>,

                      <td
                        key={`company-tax-${rowIndex}-${partnerIndex}`}
                      >
                        {formatCurrency(
                          partner.companyProfitTax
                        )}
                      </td>,

                    ]
                  }
                )}


                {/* ==================================
                    TOTAL TAX
                    ================================== */}

                {(
                  viewMode === "both" ||
                  viewMode === "llp"
                ) && (
                  <td>
                    {formatCurrency(
                      row.totalTaxPaidByPartnersAndLLP
                    )}
                  </td>
                )}


                {(
                  viewMode === "both" ||
                  viewMode === "company"
                ) && (
                  <td>
                    {formatCurrency(
                      row.totalTaxPaidByDirectorsAndCompany
                    )}
                  </td>
                )}

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>



    {/* ==========================================
        CUSTOM PROFIT ROW
        ========================================== */}

    <form
      onSubmit={addCustomProfitRow}
      className={`d-flex align-items-end gap-3 mt-4 ${
        Device.isMobile
          ? "flex-column align-items-stretch"
          : ""
      }`}
    >

      <Input
        label="Custom Profit Amount"
        type="number"
        value={customProfit}
        setValue={setCustomProfit}
        compact={true}
        placeholder="Enter profit amount"
      />


      <button
        type="submit"
        className="bg-black text-white px-3 py-1 br-10px"
      >
        Add Row
      </button>

    </form>

  </div>

)}

      </div>
    </>
  )
}



export default LlpVsCompanyTaxComparison