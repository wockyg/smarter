import { createContext, useState } from 'react';

export const BillingContext = createContext();

const BillingContextProvider = (props) => {

    // const [billMode, setBillMode] = useState(false);
    // const [keepBillMode, setKeepBillMode] = useState(false);
    // const [cptRows, setCptRows] = useState([]);
    // const [newRowData, setNewRowData] = useState({});
    const [selectedD1500, setSelectedD1500] = useState(null);
    
    return (
        <BillingContext.Provider 
        value={{ selectedD1500, setSelectedD1500 }}>
            {props.children}
        </BillingContext.Provider>
    );
}

export default BillingContextProvider;