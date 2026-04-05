/** Pro: allow Payload + DB + S3 work to finish (default 10s was timing out). */
export const maxDuration = 60

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }