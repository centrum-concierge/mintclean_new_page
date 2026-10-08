export const site = {
  name: "Mint Clean",
  legalName: "Mint Clean Building Maintenance Ltd.",
  phone: "604-649-3804",
  phoneHref: "tel:+16046493804",
  email: "info@mintclean.ca",
  privacyEmail: "privacy@mintclean.ca",
  address: {
    line1: "170-422 Richards Street",
    city: "Vancouver, BC",
    postal: "V6B 2Z4",
  },
  serviceArea:
    "Mint Clean serves clients across the Lower Mainland, stretching from North Vancouver to Langley.",
};

export type NavLink = { label: string; href: string; description?: string };

export const commercialServiceLinks: NavLink[] = [
  {
    label: "Commercial Janitorial Services",
    href: "/commercial-janitorial-services",
    description: "Daily and scheduled cleaning for commercial properties.",
  },
  {
    label: "Heavy Duty Maintenance",
    href: "/heavy-duty-maintenance-commercial",
    description: "Carpet, floor, and facility upkeep for commercial sites.",
  },
];

export const residentialServiceLinks: NavLink[] = [
  {
    label: "Residential Strata Janitorial Services",
    href: "/residential-janitorial-services",
    description: "Cleaning for common areas of strata properties.",
  },
  {
    label: "Residential Strata Caretaking Services",
    href: "/strata-caretaking-services",
    description: "On-site administrative and building support.",
  },
  {
    label: "Heavy Duty Maintenance",
    href: "/heavy-duty-maintenance-residential",
    description: "Carpet, floor, and facility upkeep for strata buildings.",
  },
];

export const mainNav = [
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/commercial-services",
    children: [
      { heading: "Commercial", href: "/commercial-services", items: commercialServiceLinks },
      { heading: "Residential", href: "/residential-services", items: residentialServiceLinks },
    ],
  },
  { label: "Snow Removal", href: "/snow-removal" },
  { label: "Contact", href: "/contact" },
];

export const footerServiceLinks: NavLink[] = [
  ...commercialServiceLinks,
  ...residentialServiceLinks,
  { label: "Snow Removal", href: "/snow-removal" },
];

export const trustPillars = ["Professionalism", "Reliability", "Attention to Detail"];
