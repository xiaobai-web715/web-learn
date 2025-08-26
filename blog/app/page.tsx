import React from "react";
import DocsHeader from "./DocsHeader/index";
import DocsContent from "./DocsContent";
import DocsFooter from "./DocsFooter/index"
export default function DocsPage() {
    return (
        <React.Fragment>
            <DocsHeader />
            <DocsContent />
            <DocsFooter />
        </React.Fragment>
    )
}
