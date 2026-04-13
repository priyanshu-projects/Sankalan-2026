import About from "./About";
import Hero from "./Hero";
import AboutDept from "./AboutDepartment";
import Contact from "./Contact";
import Timeline     from "./Timeline";
import Testimonials from "./Testimonials";
import Gallery      from "./Gallery";


export default function Home() {
  return (
    <>
      <Hero/>
      <About/>
      <AboutDept/>
      <Timeline />
      <Testimonials />
      <Gallery />
      <Contact />
    </>
  );
}