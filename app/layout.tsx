import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Quescade Stage 0 + Stage 1 Starter",
    description: "Stage 0/1 scaffold for Quescade Core"
};

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}