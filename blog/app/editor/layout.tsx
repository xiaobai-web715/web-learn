export default function EditLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div id="editor">
            {children}
        </div>
    )
}