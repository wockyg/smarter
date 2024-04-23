import { createContext, useState } from 'react';

export const SelectedClaimContext = createContext();

const SelectedClaimContextProvider = (props) => {

    const [selectedClaimId, setSelectedClaimId] = useState(-1);
    const [page, setPage] = useState(0);
    const [tab, setTab] = useState(0);
    
    const [billMode, setBillMode] = useState(false);
    const [keepBillMode, setKeepBillMode] = useState(false);
    const [cptRows, setCptRows] = useState([]);
    const [newRowData, setNewRowData] = useState({});
    const [selectedV1500, setSelectedV1500] = useState(null);
    const [v1500UploadProgress, setV1500UploadProgress] = useState([]);
    
    return (
        <SelectedClaimContext.Provider 
        value={{ selectedClaimId, setSelectedClaimId, 
                 page, setPage, 
                 tab, setTab, 
                 billMode, setBillMode, 
                 cptRows, setCptRows, 
                 newRowData, setNewRowData, 
                 keepBillMode, setKeepBillMode, 
                 selectedV1500, setSelectedV1500, 
                 v1500UploadProgress, setV1500UploadProgress }}>
            {props.children}
        </SelectedClaimContext.Provider>
    );
}

export default SelectedClaimContextProvider;