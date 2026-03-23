import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/indiana-tube-logo.svg";

const Footer = () => {
  return (
    <footer className="bg-warm-white text-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Indiana Tube Corporation" className="h-12 w-auto mb-4" />
            <p className="text-muted-foreground text-sm leading-relaxed mt-4">
              45+ years engineering precision steel tubing solutions for the world's most demanding industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Industries", path: "/industries" },
                { label: "Products", path: "/products" },
                { label: "Downloads", path: "/downloads" },
                { label: "About Us", path: "/about" },
                { label: "Employee News", path: "/employee-news" },
                { label: "Careers", path: "/careers" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-primary">
              Industries
            </h4>
            <ul className="space-y-3">
              {[
                "Automotive & Transportation",
                "Oil & Gas Energy",
                "HVAC & Appliance",
                "Heavy Equipment",
                "Hardware & Structural",
              ].map((industry) => (
                <li key={industry}>
                  <Link
                    to="/industries"
                    className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                  >
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-primary">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-sm">
                  2100 Lexington Avenue<br />
                  Evansville, IN 47720
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="tel:+18124249028"
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  (812) 424-9028
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a
                  href="mailto:sales@indianatube.com"
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  sales@indianatube.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Indiana Tube Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-muted-foreground text-xs hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-steel-muted text-xs hover:text-secondary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
