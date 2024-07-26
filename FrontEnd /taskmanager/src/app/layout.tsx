import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
