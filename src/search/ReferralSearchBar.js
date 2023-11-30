import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';

import Paper from '@mui/material/Paper';

import useGetClaimantsDropdown from '../hooks/useGetClaimantsDropdown';
import useGetTherapistsDropdown from '../hooks/useGetTherapistsDropdown';
import useGetAdjustersDropdown from '../hooks/useGetAdjustersDropdown';
import useGetClientsDropdown from '../hooks/useGetClientsDropdown';
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

export default function ReferralSearchBar(props) {

    const {searchVal, searchValAdvanced, handleChangeSearch, handleClearSearch, handleClearEntireSearch} = props;

    const { status: statusClaimants, data: claimants, error: errorClaimants, isFetching: isFetchingClaimants } = useGetClaimantsDropdown();
    const { status: statusAdjusters, data: adjusters, error: errorAdjusters, isFetching: isFetchingAdjusters } = useGetAdjustersDropdown();
    const { status: statusClients, data: clients, error: errorClients, isFetching: isFetchingClients } = useGetClientsDropdown();
    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsDropdown();
    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersDropdown();

    const claimantsSorted = claimants && claimants?.sort((a, b) => {
      const valueA = a.lastName === null ? '' : (typeof a.lastName === "string" ? a.lastName.toUpperCase() : a.lastName);
      const valueB = b.lastName === null ? '' : (typeof b.lastName === "string" ? b.lastName.toUpperCase() : b.lastName);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    const employersSorted = employers && employers?.sort((a, b) => {
      const valueA = a.name === null ? '' : (typeof a.name === "string" ? a.name.toUpperCase() : a.name);
      const valueB = b.name === null ? '' : (typeof b.name === "string" ? b.name.toUpperCase() : b.name);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    const adjustersSorted = adjusters && adjusters?.sort((a, b) => {
      const valueA = a.lastName === null ? '' : (typeof a.lastName === "string" ? a.lastName.toUpperCase() : a.lastName);
      const valueB = b.lastName === null ? '' : (typeof b.lastName === "string" ? b.lastName.toUpperCase() : b.lastName);
      const valueC = a.firstName === null ? '' : (typeof a.firstName === "string" ? a.firstName.toUpperCase() : a.firstName);
      const valueD = b.firstName === null ? '' : (typeof b.firstName === "string" ? b.firstName.toUpperCase() : b.firstName);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      if (valueC > valueD) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueC < valueD) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    const clientsSorted = clients && clients?.sort((a, b) => {
      const valueA = a.client === null ? '' : (typeof a.client === "string" ? a.client.toUpperCase() : a.client);
      const valueB = b.client === null ? '' : (typeof b.client === "string" ? b.client.toUpperCase() : b.client);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    const therapistsSorted = therapists && therapists?.sort((a, b) => {
      const valueA = a.name === null ? '' : (typeof a.name === "string" ? a.name.toUpperCase() : a.name);
      const valueB = b.name === null ? '' : (typeof b.name === "string" ? b.name.toUpperCase() : b.name);
      const valueC = a.address === null ? '' : (typeof a.address === "string" ? a.address.toUpperCase() : a.address);
      const valueD = b.address === null ? '' : (typeof b.address === "string" ? b.address.toUpperCase() : b.address);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      if (valueC > valueD) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueC < valueD) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    return (
      <>
      {claimants && adjusters && clients && therapists && employers &&
      <Paper elevation={3}>
      <Box sx={{borderRadius: 1, padding: 1, background: '#D5D8DC'}}>
        <Grid container spacing={1}>
          {/* assign */}
          <Grid item>
            <label htmlFor="assign" style={{display: 'block'}}>Assign:</label>
            <select
            id='assign'
            onChange={(e) => handleChangeSearch(e, 'assign')}
            value={searchValAdvanced.assign ? searchValAdvanced.assign : ''}
            >
              <option value="">
                {"--"}
              </option>
              {careCoordinators?.map((n) => (
                  <option key={n.Initials} value={n.Initials}>{n.Initials}</option>
              ))}
            </select>
          </Grid>
          {/* service */}
          <Grid item>
            <label htmlFor="service" style={{display: 'block'}}>Service:</label>
            <select
            id='service'
            onChange={(e) => handleChangeSearch(e, 'service')}
            value={searchValAdvanced.service ? searchValAdvanced.service : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {services?.map((n) => (
                  <option key={n.service} value={n.service}>{n.service}</option>
              ))}
            </select>
          </Grid>
          {/* claimant */}
          <Grid item>
            <label htmlFor="claimant" style={{display: 'block'}}>Claimant:</label>
            <select
            id='claimant'
            onChange={(e) => handleChangeSearch(e, 'claimant')}
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {claimantsSorted?.map((n) => (
                  <option key={n.claimantId} value={`${n.lastName}, ${n.firstName}`}>
                    {`${n.lastName}, ${n.firstName}`}
                  </option>
              ))}
            </select>

            {/* <Autocomplete
            // open={claimantSearchInputVal.length > 0}
            value={claimantSearchVal}
            onChange={(event, claim) => {
              setClaimantSearchVal(claim);
            }}
            inputValue={claimantSearchInputVal}
            onInputChange={(event, newInputValue) => {
              setClaimantSearchInputVal(newInputValue);
            }}
            id="claimantSearch-autocomplete"
            options={claimantsSorted}
            getOptionLabel={(option) => `${option.lastName}, ${option.firstName} :: DOB ${option.birthDate}`}
            sx={{ width: 500, background: '#F8F9F9', padding: 0.4 }}
            renderInput={(params) => <TextField {...params} size="small" label="Claimant Search" />}
            /> */}

            {/* <TextField 
            type='text' 
            style={{marginRight: 10, padding: 5}}
            onChange={(e) => handleChangeSearch(e, 'claimant')}
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            placeholder={`Claimant`}
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => handleClearSearch('claimant')} 
                sx={{visibility: searchValAdvanced.claimant ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            /> */}

          </Grid>
          {/* employer */}
          <Grid item>
            <label htmlFor="employer" style={{display: 'block'}}>Employer:</label>
            <select
            id='employer'
            onChange={(e) => handleChangeSearch(e, 'employer')}
            value={searchValAdvanced.employer ? searchValAdvanced.employer : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {employersSorted?.map((n) => (
                  <option key={n.employerId} value={`${n.name}`}>
                    {`${n.name}`}
                  </option>
              ))}
            </select>

            {/* {claimants &&
            <Autocomplete
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            onChange={(e, v) => handleChangeSearch(e, 'claimant', v)}
            inputValue={inputVal ? inputVal : ''}
            onInputChange={(event, newInputValue) => {
              setInputVal(newInputValue);
            }}
            id="claimant-autocomplete"
            options={claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
            getOptionLabel={(option) => option.lastName ? `${option.lastName}, ${option.firstName} DOB ${option.birthDate}` : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Claimant" />}
            />
            } */}

          </Grid>
          {/* claimNumber */}
          <Grid item>
            <label htmlFor="claimNumber" style={{display: 'block'}}>Claim #:</label>
            <input 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => handleChangeSearch(e, 'claimNumber')}
            value={searchValAdvanced.claimNumber ? searchValAdvanced.claimNumber : ''}
            />

            {/* <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => handleChangeSearch(e, 'claimNumber')}
            value={searchValAdvanced.claimNumber ? searchValAdvanced.claimNumber : ''}
            placeholder={`Claim #`}
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => handleClearSearch('claimNumber')} 
                sx={{visibility: searchValAdvanced.claimNumber ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            /> */}

          </Grid>
          {/* adjuster */}
          <Grid item>
            <label htmlFor="adjuster" style={{display: 'block'}}>Adjuster:</label>
            <select
            id='adjusterBeaver'
            onChange={(e) => handleChangeSearch(e, 'adjusterBeaver')}
            value={searchValAdvanced.adjusterBeaver ? searchValAdvanced.adjusterBeaver : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {adjustersSorted?.map((n) => (
                  <option key={n.adjusterId} value={`${n.lastName}, ${n.firstName} | ${n.client}`}>
                    {`${n.lastName}, ${n.firstName} | ${n.client}`}
                  </option>
              ))}
            </select>

            {/* {claimants &&
            <Autocomplete
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            onChange={(e, v) => handleChangeSearch(e, 'claimant', v)}
            inputValue={inputVal ? inputVal : ''}
            onInputChange={(event, newInputValue) => {
              setInputVal(newInputValue);
            }}
            id="claimant-autocomplete"
            options={claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
            getOptionLabel={(option) => option.lastName ? `${option.lastName}, ${option.firstName} DOB ${option.birthDate}` : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Claimant" />}
            />
            } */}

          </Grid>
          {/* client */}
          <Grid item>
            <label htmlFor="client" style={{display: 'block'}}>Client:</label>
            <select
            id='adjusterClient'
            onChange={(e) => handleChangeSearch(e, 'adjusterClient')}
            value={searchValAdvanced.adjusterClient ? searchValAdvanced.adjusterClient : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {clientsSorted?.map((n) => (
                  <option key={n.clientId} value={`${n.client}`}>
                    {`${n.client}`}
                  </option>
              ))}
            </select>

            {/* {claimants &&
            <Autocomplete
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            onChange={(e, v) => handleChangeSearch(e, 'claimant', v)}
            inputValue={inputVal ? inputVal : ''}
            onInputChange={(event, newInputValue) => {
              setInputVal(newInputValue);
            }}
            id="claimant-autocomplete"
            options={claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
            getOptionLabel={(option) => option.lastName ? `${option.lastName}, ${option.firstName} DOB ${option.birthDate}` : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Claimant" />}
            />
            } */}

          </Grid>
          {/* referralStatus */}
          <Grid item>
            <label htmlFor="referralStatus" style={{display: 'block'}}>Referral Status:</label>
            <select
            id='referralStatus'
            onChange={(e) => handleChangeSearch(e, 'referralStatus')}
            value={searchValAdvanced.referralStatus ? searchValAdvanced.referralStatus : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {['Open', 'Hold', 'Cancel', 'Complete', 'Reschedule'].map((n) => (
                  <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </Grid>
          {/* ptStatus */}
          <Grid item>
            <label htmlFor="ptStatus" style={{display: 'block'}}>PT Status:</label>
            <select
            id='ptStatus'
            onChange={(e) => handleChangeSearch(e, 'ptStatus')}
            value={searchValAdvanced.ptStatus ? searchValAdvanced.ptStatus : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {['Active', 'Follow-Up', 'Hold', 'Discharge'].map((n) => (
                  <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </Grid>
          {/* billingStatus */}
          <Grid item>
            <label htmlFor="billingStatus" style={{display: 'block'}}>Billing Status:</label>
            <select
            id='billingStatus'
            onChange={(e) => handleChangeSearch(e, 'billingStatus')}
            value={searchValAdvanced.billingStatus ? searchValAdvanced.billingStatus : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {['Active', 'Complete'].map((n) => (
                  <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </Grid>
          <Box width="100%"/>
          {/* therapist */}
          <Grid item>
            <label htmlFor="therapist" style={{display: 'block'}}>Therapist:</label>

            {/* {claimants &&
            <Autocomplete
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            onChange={(e, v) => handleChangeSearch(e, 'claimant', v)}
            inputValue={inputVal ? inputVal : ''}
            onInputChange={(event, newInputValue) => {
              setInputVal(newInputValue);
            }}
            id="claimant-autocomplete"
            options={claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
            getOptionLabel={(option) => option.lastName ? `${option.lastName}, ${option.firstName} DOB ${option.birthDate}` : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Claimant" />}
            />
            } */}

            <select
            id='therapistBeaver'
            onChange={(e) => handleChangeSearch(e, 'therapistBeaver')}
            value={searchValAdvanced.therapistBeaver ? searchValAdvanced.therapistBeaver : ''}
            >
              <option value="">
                {"Select"}
              </option>
              {therapistsSorted?.map((n) => (
                  <option key={n.therapistId} value={`${n.name} :: ${n.address}, ${n.city}, ${n.state} ${n.zip}`}>
                    {`${n.name} :: ${n.address}, ${n.city}, ${n.state} ${n.zip}`}
                  </option>
              ))}
            </select>
          </Grid>
          {Object.keys(searchValAdvanced).length > 0 &&
          <Grid item sx={{paddingLeft: 1}}>
            <button onClick={handleClearEntireSearch}>Clear Search</button>
          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
      }
      </>
    );
}