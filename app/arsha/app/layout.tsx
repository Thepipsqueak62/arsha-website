import {ArshaAppSidebar} from "@/components/dashboard/app-sidebar";

export default function ArshaAppLayout({
                                           children,
                                       }: {
    children: React.ReactNode
}) {
    return (
        <div
            className="fixed inset-0 z-50 flex overflow-hidden"
            style={{ background: "#0a0a0f" }}
        >
            <ArshaAppSidebar />
            <main className="flex flex-1 flex-col overflow-auto text-white">
                {children}
            </main>
        </div>
    )
}