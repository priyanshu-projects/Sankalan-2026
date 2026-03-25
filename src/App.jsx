import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Intro from "./components/common/Intro";
import PageWrapper from "./components/common/PageWrapper";

import Home from "./components/pages/home/Home";
import Events from "./components/pages/Events";
import Sponsors from "./components/pages/Sponsors";
import Team from "./components/pages/Team";
import FAQ from "./components/pages/FAQ";
import Updates from "./components/pages/Updates";
import Results from "./components/pages/Results";

function App() {
  const [introDone, setIntroDone] = useState(false);
  const location = useLocation();

  return (
    <>
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <>
          <Header />

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              
              <Route path="/" element={<PageWrapper><Home/></PageWrapper>} />
              <Route path="/events" element={<PageWrapper><Events/></PageWrapper>} />
              <Route path="/sponsors" element={<PageWrapper><Sponsors/></PageWrapper>} />
              <Route path="/team" element={<PageWrapper><Team/></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQ/></PageWrapper>} />
              <Route path="/updates" element={<PageWrapper><Updates/></PageWrapper>} />
              <Route path="/results" element={<PageWrapper><Results/></PageWrapper>} />

            </Routes>
          </AnimatePresence>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;