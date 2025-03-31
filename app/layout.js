'use client'; // This marks the file as a Client Component

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Khel</title>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-image: url('/bg.jpg'); /* Ensure this file is in the public folder */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            color: white;
          }

          main {
            padding: 20px;
            text-align: center;
          }
        `}</style>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
