import './globals.css';

export const metadata = {
  title: 'WorkVerse - Virtual Office',
  description: 'A virtual office space to collaborate, manage tasks, and enhance productivity.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
