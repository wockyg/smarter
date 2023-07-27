import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {

    // smart search
    const [searchId, setSearchId] = useState(-1);

    // quick search
    const [quickSearchVal, setQuickSearchVal] = useState(null);
    const [quickSearchInputVal, setQuickSearchInputVal] = useState('');
    
    return (
        <SearchContext.Provider 
        value={{ searchId, setSearchId, quickSearchVal, setQuickSearchVal, quickSearchInputVal, setQuickSearchInputVal }}>
            {props.children}
        </SearchContext.Provider>
    );
}

export default SearchContextProvider;