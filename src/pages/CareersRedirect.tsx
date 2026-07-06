import { useEffect } from "react";
import { COMPANY } from "@/config/company";

const CareersRedirect = () => {
  useEffect(() => {
    window.location.replace(COMPANY.urls.careers);
  }, []);

  return (
    <div className="container py-24 text-center">
      <p className="text-muted-foreground">
        Redirecting to our careers portal…{" "}
        <a href={COMPANY.urls.careers} className="text-primary underline">
          Click here if you are not redirected.
        </a>
      </p>
    </div>
  );
};

export default CareersRedirect;
