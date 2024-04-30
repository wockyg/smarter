import { createContext, useState } from 'react';

import useGetD1500Status from '../hooks/useGetD1500Status';

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
    const [v1500UploadProgress, setV1500UploadProgress] = useState({});
    const [v1500UploadComplete, setV1500UploadComplete] = useState([]);
    const [v1500UploadFail, setV1500UploadFail] = useState([]);
    const [d1500SendFormat, setD1500SendFormat] = useState('');

    const { status, data: d1500Status, error, isFetching } = useGetD1500Status(selectedV1500?.v1500Id || null);
    
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
                 v1500UploadProgress, setV1500UploadProgress,
                 v1500UploadComplete, setV1500UploadComplete,
                 v1500UploadFail, setV1500UploadFail,
                 d1500SendFormat, setD1500SendFormat,
                 d1500Status }}>
            {props.children}
        </SelectedClaimContext.Provider>
    );
}

export default SelectedClaimContextProvider;