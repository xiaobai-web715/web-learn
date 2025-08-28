import './globals.css';

export default function RootLayout({
    docsHeader,
    children,
}: Readonly<{
    docsHeader: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="dark:bg-slate-900!">
                {docsHeader}
                {children}
            </body>
        </html>
    );
}
