import { getDocInfo } from '@/request/docService';
interface IDoc {
    id: number;
    title: string;
}
interface IData {
    pages: number;
    total: number;
    records: Array<IDoc>;
}
async function DocsContent() {
    const getDocInfoData = await getDocInfo<IData>();
    const docInfo = getDocInfoData.data || {};
    return (
        <div className="docs-content flex-shrink-0 overflow-y-scroll">
            <div className="docs-content-title">
                {(docInfo?.records || []).map((info) => {
                    return <div>{info.title}</div>;
                })}
            </div>
        </div>
    );
}
export default DocsContent;
