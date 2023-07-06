import React, { createContext, useState } from 'react';

export const AddFormContext = createContext();

const AddFormContextProvider = (props) => {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [modalParty, setModalParty] = useState('');
    return (
        <AddFormContext.Provider 
        value={{ addModalOpen, setAddModalOpen, modalParty, setModalParty }}>
            {props.children}
        </AddFormContext.Provider>
    );
}

export default AddFormContextProvider;