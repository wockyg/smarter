import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

const SearchContextProvider = (props) => {

    const [detailsId, setDetailsId] = useState({});

    const [selectedParty, setSelectedParty] = useState("referral");

    const [quickSearchVal, setQuickSearchVal] = useState(null);
    const [quickSearchInputVal, setQuickSearchInputVal] = useState('');

    const [searchVals, setSearchVals] = useState({ 
                                                    claimant: '', 
                                                    claimantEmployer: null, 
                                                    adjuster: '',
                                                    adjusterStatus: '',
                                                    adjusterClient: null, 
                                                    casemanager: '', 
                                                    casemanagerStatus: '', 
                                                    casemanagerClient: null,
                                                    physician: '',
                                                    physicianFacility: '',
                                                    physicianNPI: '',
                                                    therapist: '',
                                                    therapistService: '',
                                                    therapistState: '',
                                                    attorney: '',
                                                    attorneyFirm: '',
                                                    attorneyType: '',
                                                    client: '',
                                                    clientBillingProtocol: '',
                                                    clientDiscount: '',
                                                    employer: '',
                                                    employerState: ''
                                                });

    const [searchInputVals, setSearchInputVals] = useState({ 
                                                            claimantEmployer: '', 
                                                            adjusterClient: '', 
                                                            casemanagerClient: '' 
                                                          });

    const [quarterlyReportsVals, setQuarterlyReportsVals] = useState({ 
                                                                        year: '', 
                                                                        quarter: '', 
                                                                        employer: null,
                                                                        employerInput: '',
                                                                        client: null,
                                                                        clientInput: ''
                                                                    });

    
    return (
        <SearchContext.Provider 
        value={{ 
            quickSearchVal, setQuickSearchVal, 
            quickSearchInputVal, setQuickSearchInputVal, 
            detailsId, setDetailsId,
            selectedParty, setSelectedParty,
            searchVals, setSearchVals,
            searchInputVals, setSearchInputVals,
            quarterlyReportsVals, setQuarterlyReportsVals
        }}
        >
            {props.children}
        </SearchContext.Provider>
    );
}

export default SearchContextProvider;