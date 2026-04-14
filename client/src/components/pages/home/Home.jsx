import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "./About";
import Hero from "./Hero";
import AboutDept from "./AboutDepartment";
import Contact from "./Contact";
import WhySankalan from "./WhySankalan";
import Timeline from "./Timeline";
import Gallery from "./Gallery";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToContact) {
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          const form = el.querySelector("form");
          if (form) {
            form.style.transition = "box-shadow 0.4s";
            form.style.boxShadow  = "0 0 50px rgba(0,245,196,0.15)";
            setTimeout(() => (form.style.boxShadow = "none"), 1500);
          }
        }, 600);
      }, 300);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <About />
      <AboutDept />
      <WhySankalan />
      <Timeline />
      <Gallery />
      <Contact />
    </>
  );
}