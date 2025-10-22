import { createContext, useContext } from "react";
import OtherStore from "src/store/other";

export const OtherStoreContext = createContext<OtherStore>(new OtherStore());

export function useOtherStore() {
    return useContext(OtherStoreContext);
}

export {
    OtherStore
};