import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {

    const [searchId, setSearchId] = useState(-1);
    
    return (
        <SearchContext.Provider 
        value={{ searchId, setSearchId }}>
            {props.children}
        </SearchContext.Provider>
    );
}

export default SearchContextProvider;