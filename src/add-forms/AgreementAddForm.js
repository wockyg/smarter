import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Agreement from '../document-templates/Agreement';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import useGetTherapistsDropdown from '../hooks/useGetTherapistsDropdown';
import useGetClaimantsDropdown from '../hooks/useGetClaimantsDropdown';

export default function AgreementAddForm ()  {

    const serviceTypes = ['DPT', 'WCWH', 'FCE', 'PPD'];

    const [values, setValues] = useState({therapist: null, claimant: null, serviceTypes: new Array(serviceTypes.length).fill(false)});

    const [inputValueTherapist, setInputValueTherapist] = useState('');
    const [inputValueClaimant, setInputValueClaimant] = useState('');

    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsDropdown();
    const { status: statusClaimants, data: claimants, error: errorClaimants, isFetching: isFetchingClaimants } = useGetClaimantsDropdown();

    const handleChangeEdit = (event, key, value) => {
        const newValues = {...values, [key]: value === '' ? null : value};
        const resetServices = new Array(serviceTypes.length).fill(false);
        key === "therapist" ? setValues({...newValues, serviceTypes: resetServices}) : setValues(newValues);
        // console.log(key, ":" , value);
        console.log(newValues);
    }

    const handleChangeEditServiceTypes = (index) => {

        const updatedCheckedState = values.serviceTypes.map((v, i) =>
            i === index ? !v : v
        );

        const newValues = {...values, serviceTypes: [...updatedCheckedState]};
        setValues(newValues);
        // console.log(key, ":" , value);
        console.log(newValues);
    }

    return(
    <>
    {therapists && claimants &&
    <>
    {/* agreementType */}
    <div id='agreementTypeRadioGroup' onChange={(e) => handleChangeEdit(e, 'agreementType', e.target.value)}>
        <input type="radio" id="Network" name="agreementType" value="Network" />
        <label htmlFor="Network">Network</label>
        <input type="radio" id="Single-Case" name="agreementType" value="Single-Case" />
        <label htmlFor="Single-Case">Single-Case</label>
    </div>

    {/* therapist */}
    <Autocomplete
    id="therapistInput"
    name="therapist"
    options={therapists?.sort((a, b) => -b.name.localeCompare(a.name))}
    getOptionLabel={(option) => `${option.name} | ${option.address}, ${option.city}, ${option.state} ${option.zip} (${option.therapistId})`}
    sx={{ width: 800 }}
    value={values.therapist}
    onChange={(e, v) => handleChangeEdit(e, 'therapist', v)}
    inputValue={inputValueTherapist}
    onInputChange={(event, newInputValue) => {
        setInputValueTherapist(newInputValue);
    }}
    renderInput={(params) => (
        <TextField
        {...params}
        margin="normal"
        label="Therapist"
        fullWidth
        />
    )}
    />
    {values.therapist && 
    <>
    <div id='serviceTypeCheckboxGroup'>
        {serviceTypes.map((value, index) => {
            const isDisabledDPT = (values.therapist.dailyRate && (values.therapist.evalRate || values.therapist.combinedRate)) ? false : true;
            const isDisabledWCWH = values.therapist.wcwhFirst2Hrs ? false : true;
            const isDisabledFCE = values.therapist.fceRate ? false : true;
            const isDisabledPPD = values.therapist.ppdRate ? false : true;
            return(
                <div key={index} className="listItem">
                    <input
                    disabled={index === 0 ? isDisabledDPT : (index === 1 ? isDisabledWCWH : (index === 2 ? isDisabledFCE : (index === 3 && isDisabledPPD)))}
                    type="checkbox"
                    id={`serviceType-checkbox-${index}`}
                    name={value}
                    value={value}
                    checked={values.serviceTypes[index]}
                    onChange={() => handleChangeEditServiceTypes(index)}
                    />
                    <label htmlFor={`serviceType-checkbox-${index}`}>{serviceTypes[index]}</label>
                </div>
            );
        })}
    </div>
    </>}

    {values.agreementType === 'Single-Case' &&
    <>
    {/* claimant */}
    <Autocomplete
    id="claimantInput"
    name="claimant"
    options={claimants?.sort((a, b) => -b.lastFirst.localeCompare(a.lastFirst))}
    getOptionLabel={(option) => `${option.lastFirst} | ${option.birthDate}`}
    sx={{ width: 600 }}
    value={values.claimant}
    onChange={(e, v) => handleChangeEdit(e, 'claimant', v)}
    inputValue={inputValueClaimant}
    onInputChange={(event, newInputValue) => {
        setInputValueClaimant(newInputValue);
    }}
    renderInput={(params) => (
        <TextField
        {...params}
        margin="normal"
        label="Claimant"
        fullWidth
        />
    )}
    />
    </>
    }

    {values.agreementType && values.therapist && values.serviceTypes.includes(true) && (values.agreementType === 'Network' || values.claimant) &&
    <PDFDownloadLink document={<Agreement values={values} />} fileName={`GA-DPT SCA-ATI Physical Therapy-Doe, John.pdf`}>
        {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : <button>DL Agreement</button>
        }
    </PDFDownloadLink>
    }
    </>
    }
    </>);
}