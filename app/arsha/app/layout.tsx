
export default function ArshaAppLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return (
        <div
            className=""
            style={{ background: "#0a0a0f" }}
        >
            <main className="flex flex-1 flex-col overflow-auto text-white">
                {children}
            </main>
        </div>
    )
}