export const dynamic = 'force-dynamic';
import React from 'react';
import DocsContent from './docsContent/DocsContent';
import DocsFooter from './DocsFooter/index';
export default function DocsPage() {
    return (
        <React.Fragment>
            <DocsContent />
            <DocsFooter />
        </React.Fragment>
    );
}
