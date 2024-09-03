import React from "react";
import DragWindowRegion from "@/components/DragWindowRegion";

export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DragWindowRegion title="WordScript"  />
            <main>{children}</main>
        </>
    );
}
