export const metadata = {
  title: "EliteCoat Interiors | Premium plastering, painting & decorating",
  description: "Interior plastering, painting & decorating services in the UK."
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{margin:0, fontFamily:"system-ui"}}>{children}</body>
    </html>
  );
}
