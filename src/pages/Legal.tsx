import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionReveal from "@/components/SectionReveal";
import { CookieSettingsButton } from "@/components/CookieConsent";

const Legal = () => {
  const { hash } = useLocation();
  const [tab, setTab] = useState(hash === "#terms" ? "terms" : "privacy");

  useEffect(() => {
    setTab(hash === "#terms" ? "terms" : "privacy");
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="container py-16 max-w-4xl">
      <SectionReveal>
        <h1 className="font-heading text-4xl font-bold mb-8 text-foreground">Legal</h1>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          </TabsList>

          <TabsContent value="privacy" className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm italic text-muted-foreground/70 mb-6">
              Draft — subject to legal review. Last updated: {new Date().toLocaleDateString()}.
            </p>

            <h2 className="text-2xl font-heading font-bold text-foreground mt-0">Privacy Policy</h2>
            <p>
              Indiana Tube Corporation ("we," "us," or "our") is committed to protecting your
              privacy. This Privacy Policy describes how we collect, use, and share information
              when you visit our website.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Information We Collect</h3>
            <p>
              We may collect personal information you voluntarily provide, such as your name,
              email address, phone number, company name, and any details you include in quote
              request or job application forms.
            </p>
            <p>
              We also automatically collect certain technical information, including your IP
              address, browser type, and pages visited, through standard server logs and cookies.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to quote requests and inquiries</li>
              <li>Process job applications</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-foreground">Cookies</h3>
            <p>
              Our website may use cookies and similar technologies to enhance your browsing
              experience. You can control cookie preferences through your browser settings.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Data Sharing</h3>
            <p>
              We do not sell your personal information. We may share information with service
              providers who assist in operating our website, or when required by law.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Contact</h3>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:sales@indianatube.com" className="text-primary hover:underline">
                sales@indianatube.com
              </a>.
            </p>
          </TabsContent>

          <TabsContent value="terms" className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm italic text-muted-foreground/70 mb-6">
              Draft — subject to legal review. Last updated: {new Date().toLocaleDateString()}.
            </p>

            <h2 className="text-2xl font-heading font-bold text-foreground mt-0">Terms of Service</h2>
            <p>
              By accessing and using the Indiana Tube Corporation website, you agree to the
              following terms and conditions.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Use of Website</h3>
            <p>
              This website is provided for informational purposes about Indiana Tube Corporation's
              products and services. You agree to use it only for lawful purposes and in
              accordance with these Terms.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Intellectual Property</h3>
            <p>
              All content on this website — including text, images, logos, and graphics — is the
              property of Indiana Tube Corporation and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or create derivative works without
              our prior written consent.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Disclaimer</h3>
            <p>
              The information on this website is provided "as is" without warranty of any kind.
              Indiana Tube Corporation makes no representations or warranties regarding the
              accuracy or completeness of any content.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Limitation of Liability</h3>
            <p>
              Indiana Tube Corporation shall not be liable for any damages arising from the use
              of, or inability to use, this website or its content.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Changes to Terms</h3>
            <p>
              We reserve the right to update these Terms at any time. Continued use of the website
              after changes constitutes acceptance of the revised Terms.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Contact</h3>
            <p>
              Questions about these Terms may be directed to{" "}
              <a href="mailto:sales@indianatube.com" className="text-primary hover:underline">
                sales@indianatube.com
              </a>.
            </p>
          </TabsContent>
        </Tabs>
      </SectionReveal>
    </div>
  );
};

export default Legal;
