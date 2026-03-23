import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/indiana-tube-logo.svg";
import { Menu, X, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Industries", path: "/industries" },
  { label: "Products", path: "/products" },
  { label: "Downloads", path: "/downloads" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Indiana Tube Corporation" className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            // Insert About dropdown after Downloads
            if (link.label === "Careers") {
              return (
                <span key="about-dropdown-and-careers" className="contents">
                  <DropdownMenu>
                    <DropdownMenuTrigger className={`px-4 py-2 text-base font-medium rounded-md transition-colors inline-flex items-center gap-1 outline-none ${
                      location.pathname === "/about" || location.pathname === "/employee-news"
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}>
                      About <ChevronDown className="h-3.5 w-3.5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-warm-white border-border z-50" align="center">
                      <DropdownMenuItem asChild>
                        <Link to="/about" className="text-foreground/80 hover:text-foreground cursor-pointer">
                          About Us
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/employee-news" className="text-foreground/80 hover:text-foreground cursor-pointer">
                          Employee News
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </span>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="ml-4 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-orange-deep transition-colors shadow-orange-glow"
          >
            Request a Quote
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-warm-white border-t border-border overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                if (link.label === "Careers") {
                  const aboutActive = location.pathname === "/about" || location.pathname === "/employee-news";
                  return (
                    <span key="mobile-about-and-careers" className="contents">
                      {/* About collapsible parent */}
                      <button
                        type="button"
                        onClick={() => setAboutOpen(!aboutOpen)}
                        className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors w-full text-left ${
                          aboutActive
                            ? "text-primary bg-muted"
                            : "text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        About
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${aboutOpen ? "rotate-180" : ""}`} />
                      </button>
                      {aboutOpen && (
                        <div className="flex flex-col gap-1 pl-4">
                          <Link
                            to="/about"
                            onClick={() => setMobileOpen(false)}
                            className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                              location.pathname === "/about"
                                ? "text-primary bg-muted"
                                : "text-foreground/70 hover:text-foreground"
                            }`}
                          >
                            About Us
                          </Link>
                          <Link
                            to="/employee-news"
                            onClick={() => setMobileOpen(false)}
                            className={`px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                              location.pathname === "/employee-news"
                                ? "text-primary bg-muted"
                                : "text-foreground/70 hover:text-foreground"
                            }`}
                          >
                            Employee News
                          </Link>
                        </div>
                      )}
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                          location.pathname === link.path
                            ? "text-primary bg-muted"
                            : "text-foreground/70 hover:text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </span>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === link.path
                        ? "text-primary bg-muted"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="px-4 py-2">
                <LanguageSwitcher />
              </div>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-md text-center"
              >
                Request a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
