import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="dark:bg-slate-900!">
                <div id='content'>{children}</div>
            </body>
        </html>
    );
}
