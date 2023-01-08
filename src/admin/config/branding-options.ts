import { BrandingOptions, BrandingOptionsFunction } from "adminjs";

export const brandingOptions: BrandingOptions | BrandingOptionsFunction = {
  companyName: 'Emotions APP',
  withMadeWithLove: false,
  logo: "/emotions_logo.png",
  favicon: "/emotions_icon.png",
  theme: {
    colors: {
      primary100: "rgba(219, 101, 81, 0.99)",
      primary60: "#ffffff",
      primary20: "#E6896B",
      hoverBg: "#E6896B"
    }
  },
};
