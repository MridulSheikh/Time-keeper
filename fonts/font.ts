import localFont from "next/font/local";

export const oswadfont = localFont({
  src: [
    {
      path: "oswald/oswald-Regular.ttf",
      style: "400",
      weight: "normal",
    },
    {
      path: "oswald/oswald-Medium.ttf",
      style: "600",
      weight: "bold",
    },
  ],
  variable: "--font-oswald",
});

export const dubaifont = localFont({
  src:[
    {
      path: "dubai/Dubai-Regular.woff",
      style: "400",
      weight: "normal",
    },
    {
      path: "dubai/Dubai-Bold.woff",
      style: "600",
      weight: "bold",
    },
  ],
  variable: "--font-dubai",
})
