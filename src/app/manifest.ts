import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mint Clean",
    short_name: "Mint Clean",
    description:
      "Commercial and residential building maintenance across Greater Vancouver.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f9f6e",
    icons: [
      {
        src: "/icons/android-chrome-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/android-chrome-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
