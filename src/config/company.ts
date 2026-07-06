// Centralized company constants — change in one place.

export const COMPANY = {
  name: "Indiana Tube Corporation",
  address: {
    street: "2100 Lexington Avenue",
    city: "Evansville",
    state: "IN",
    zip: "47720",
    get formatted() {
      return `${this.street}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },
  phone: {
    display: "(812) 424-9028",
    tel: "+18124249028",
  },
  email: {
    sales: "sales@indianatube.com",
  },
  urls: {
    careers: "https://myjobs.adp.com/indianatubecareers",
    facebook: "https://www.facebook.com/IndianaTubeCorporation/",
    linkedin: "https://www.linkedin.com/company/indiana-tube-corporation/",
  },
} as const;
