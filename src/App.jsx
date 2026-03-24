import Header from "./components/common/Header"
import Footer from "./components/common/Footer"

import Home from "./components/pages/home/Home"
import Events from "./components/pages/Events"
import Sponsors from "./components/pages/Sponsors"
import Team from "./components/pages/Team"
import FAQ from "./components/pages/FAQ"
import Updates from "./components/pages/Updates"
import Results from "./components/pages/Results"

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/sponsors" element={<Sponsors/>} />
        <Route path="/team" element={<Team/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/updates" element={<Updates/>} />
        <Route path="/results" element={<Results/>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App