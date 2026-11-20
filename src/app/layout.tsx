import type { Metadata, Viewport } from "next";
import { Figtree, Jost, Libre_Baskerville, Noto_Sans_Sinhala, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/i18n/client";
import { getLocale, getT } from "@/i18n/server";
import { site } from "@/data/site";

const body = Figtree({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-body", display: "swap" });
const serif = Libre_Baskerville({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif-italic", display: "swap" });
const futura = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-futura-sub", display: "swap" });
const sinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], variable: "--font-sinhala", display: "swap" });
const tamil = Noto_Sans_Tamil({ subsets: ["tamil"], variable: "--font-tamil", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.title}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_LK",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#3078be" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const { t } = await getT();
  return (
    <html
      lang={locale}
      className={`${body.variable} ${serif.variable} ${futura.variable} ${sinhala.variable} ${tamil.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <LocaleProvider locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-white focus:p-3"
          >
            {t("skip")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
