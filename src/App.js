import { BrowserRouter, Routes, Route } from "react-router-dom"
import DeviceStore from "./stores/global/DeviceStore"
import Layout from "./components/Layout"
import Home from "./pages/home"
import Pagination from "./pages/pagination"
import MutableStore from "./stores/global/MutableStore/MutableStore"

const App = () => {
  return (
    <DeviceStore>
      <MutableStore>
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="pagination" element={<Pagination />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </MutableStore>
    </DeviceStore>
  )
}

export default App
