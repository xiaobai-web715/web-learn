import DocsHeader from "./DocsHeader";
import DocsContent from "./DocsContent";
export default function DocsPage() {
    return (
      <div className="docs-page flex flex-col items-center">
          <div className="docs-header flex-shrink-0">
              <DocsHeader />
          </div>
          <div className="docs-content flex-grow-1">
              <DocsContent />
          </div>
      </div>
    )
}
