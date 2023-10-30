import React, { createContext, useState } from 'react';

export const DetailsContext = createContext();

const DetailsContextProvider = (props) => {

    const [currentlyEditingSearch, setCurrentlyEditingSearch] = useState(false);
    const [currentlyEditingSelectedClaim, setCurrentlyEditingSelectedClaim] = useState(null);
    
    return (
        <DetailsContext.Provider 
        value={{ currentlyEditingSearch, setCurrentlyEditingSearch, currentlyEditingSelectedClaim, setCurrentlyEditingSelectedClaim }}>
            {props.children}
        </DetailsContext.Provider>
    );
}

export default DetailsContextProvider;