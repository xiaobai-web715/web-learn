import './globals.css';
import '@/styles/_variables.scss'
import '@/styles/_keyframe-animations.scss'

export default function RootLayout({
    docsHeader,
    children,
}: Readonly<{
    docsHeader: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="dark:bg-slate-900! flex flex-col">
                <div className="flex-shrink-0">{docsHeader}</div>
                <div className="flex-1 overflow-auto">{children}</div>
            </body>
        </html>
    );
}
