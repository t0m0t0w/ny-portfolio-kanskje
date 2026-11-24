export const SITE = {
  name: "hermann roos",
  defaultTitle: "hermann roos",
  defaultNavTitle: "hei hei, jeg heter hermann roos",
  defaultDescription:
    "Portefølje for Hermann Roos – design, medieproduksjon, utvikling og foto.",
} as const;

export const NAV_LINKS = [
  { label: "hjem", href: "/" },
  { label: "medieteknikk", href: "/#medieteknikk" },
  { label: "prosjekter", href: "/prosjekter/" },
  { label: "cv", href: "/#foto" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/hermann.roos/",
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hermann-roos/",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@tomotow",
    icon: "youtube",
  },
] as const;

export interface ProjectSummary {
  slug: string;
  title: string;
  href: string;
  image: string;
  alt: string;
  sizeClass: string;
}

export const PROJECTS: readonly ProjectSummary[] = [
  {
    slug: "blalange",
    title: "blålange",
    href: "/prosjekter/blalange/",
    image: "/assets/img/Stor typeface.png",
    alt: "Blålange logo",
    sizeClass: "portfolio-bilde--ekstrakort",
  },
  {
    slug: "krydderbot",
    title: "krydderbot",
    href: "/prosjekter/krydderbot/",
    image: "/assets/img/krydderStor typefacehermann.png",
    alt: "Krydderbot logo",
    sizeClass: "portfolio-bilde--ekstrakort",
  },
];
