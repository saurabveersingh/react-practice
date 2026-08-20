import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "components/Layout"
import Home from "pages/home"
import Pagination from "pages/pagination"

import DepreciationChartNav from "pages/depreciation-charts"
import SingleAssetDepreciationChart from "pages/depreciation-charts/single-asset"
import MultiAssetDepreciationChart from "pages/depreciation-charts/multi-asset"
import LlpVsCompanyTaxComparison from "pages/llp-vs-company-tax-comparison"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pagination" element={<Pagination />} />
          <Route path="depreciation-charts" element={<DepreciationChartNav />}>
            <Route index element={<SingleAssetDepreciationChart />} />
            <Route path="multi-asset" element={<MultiAssetDepreciationChart />} />
          </Route>
          <Route path="llp-vs-company-tax-comparison" element={<LlpVsCompanyTaxComparison />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
