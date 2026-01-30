import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-deepblack border-b border-neon px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold italic">Deepstack.</h1>

      <div className="space-x-6 text-sm uppercase tracking-wide">
        <Link className="hover:text-white" to="/">Home</Link>
        <Link className="hover:text-white" to="/about">About</Link>
        <Link className="hover:text-white" to="/courses">Courses</Link>
        <Link className="hover:text-white" to="/admissions">Admissions</Link>
        <Link className="hover:text-white" to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
