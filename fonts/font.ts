import localFont from "next/font/local";

export const oswadfont = localFont({
  src: [
    {
      path: "../fonts/oswald/oswald-Regular.ttf",
      style: "400",
      weight: "normal",
    },
    {
      path: "../fonts/oswald/oswald-Medium.ttf",
      style: "600",
      weight: "bold",
    },
  ],
  variable: "--font-oswald",
});

export const dubaifont = localFont({
  src:[
    {
      path: "../fonts/dubai/Dubai-Regular.woff",
      style: "400",
      weight: "normal",
    },
    {
      path: "../fonts/dubai/Dubai-Bold.woff",
      style: "600",
      weight: "bold",
    },
  ],
  variable: "--font-dubai",
})
