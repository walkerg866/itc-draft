import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Linkedin } from "lucide-react";
import logo from "@/assets/indiana-tube-logo.svg";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { COMPANY } from "@/config/company";

const Footer = () => {
  return (
    <footer className="bg-warm-white text-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Indiana Tube Corporation" className="h-20 w-auto mb-4" />
            <p className="text-muted-foreground text-lg leading-relaxed mt-4">
              45+ years engineering precision steel tubing solutions for the world's most demanding industries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider mb-4 text-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Industries", path: "/industries" },
                { label: "Products", path: "/products" },
                { label: "Downloads", path: "/downloads" },
                { label: "About Us", path: "/about" },
                { label: "Employee News", path: "/employee-news" },
                { label: "Careers", path: COMPANY.urls.careers, external: true },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-lg hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-muted-foreground text-lg hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider mb-4 text-primary">
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
                    className="text-muted-foreground text-lg hover:text-foreground transition-colors"
                  >
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-lg uppercase tracking-wider mb-4 text-primary">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground text-lg">
                  2100 Lexington Avenue<br />
                  Evansville, IN 47720
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="tel:+18124249028"
                  className="text-muted-foreground text-lg hover:text-foreground transition-colors"
                >
                  (812) 424-9028
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:sales@indianatube.com"
                  className="text-muted-foreground text-lg hover:text-foreground transition-colors"
                >
                  sales@indianatube.com
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/IndianaTubeCorporation/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/indiana-tube-corporation/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-base">
            © {new Date().getFullYear()} Indiana Tube Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal#privacy" className="text-muted-foreground text-base hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal#terms" className="text-muted-foreground text-base hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <CookieSettingsButton className="text-muted-foreground text-base hover:text-foreground transition-colors" />
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;