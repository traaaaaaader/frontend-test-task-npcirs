import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-white shadow-sm"
        : "text-text-muted hover:bg-surface hover:text-text"
    }`;

  return (
    <nav className="w-full bg-surface shadow-sm border-b border-default">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-14 items-center justify-between">
          <div className="text-lg font-bold text-primary">MyApp</div>

          <div className="flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/citizens" className={navLinkClass}>
              Citizens
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
