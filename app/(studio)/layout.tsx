import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} cz-shortcut-listen="false">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
