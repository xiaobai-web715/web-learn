import { getDocInfo } from '@/request/docService';
import DocsItem from './docsItem';
import { IData } from './type';
async function DocsContent() {
    const getDocInfoData = await getDocInfo<IData>();
    const docInfo = getDocInfoData.data || {};
    return (
        <div className="docs-content flex-shrink-0 overflow-y-scroll">
            <div className="md:w-[60%] w-[80%] m-auto">
                {(docInfo?.records || []).map((info) => {
                    return <DocsItem info={info}></DocsItem>;
                })}
            </div>
        </div>
    );
}
export default DocsContent;
