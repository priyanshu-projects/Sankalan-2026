import { useState } from "react";
import { Link } from "react-router-dom";
// agar assets folder use kar raha hai to uncomment kar:
import logo from "../../assets/logo.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 text-white">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <img 
          src={logo}     // agar assets se import kar raha hai to ye use kar
          alt="Sankalan Logo"
          className="h-28 md:h-32 object-contain"
        />

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 text-sm tracking-widest font-medium">

          <Link to="/" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            HOME
          </Link>

          <Link to="/events" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            EVENTS
          </Link>

          <Link to="/team" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            TEAM
          </Link>

          <Link to="/sponsors" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            SPONSORS
          </Link>

          <Link to="/faq" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            FAQ
          </Link>

          <Link to="/updates" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            UPDATES
          </Link>

          <Link to="/results" className="hover:text-cyan-400 transition duration-300 cursor-pointer">
            RESULTS
          </Link>

        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-sm tracking-widest">

          <Link to="/" className="hover:text-cyan-400">HOME</Link>
          <Link to="/events" className="hover:text-cyan-400">EVENTS</Link>
          <Link to="/team" className="hover:text-cyan-400">TEAM</Link>
          <Link to="/sponsors" className="hover:text-cyan-400">SPONSORS</Link>
          <Link to="/faq" className="hover:text-cyan-400">FAQ</Link>
          <Link to="/updates" className="hover:text-cyan-400">UPDATES</Link>
          <Link to="/results" className="hover:text-cyan-400">RESULTS</Link>

        </div>
      )}
    </nav>
  );
}