import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';

import useGetClaimantsDropdown from '../hooks/useGetClaimantsDropdown';
import useGetTherapistsDropdown from '../hooks/useGetTherapistsDropdown';
import useGetAdjustersDropdown from '../hooks/useGetAdjustersDropdown';
import useGetClientsDropdown from '../hooks/useGetClientsDropdown';
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

export default function ReferralSearchBar(props) {

    const {searchVal, searchValAdvanced, handleChangeSearch, handleClearSearch, handleClearEntireSearch} = props;

    const [inputVal, setInputVal] = useState('');

    const { status: statusClaimants, data: claimants, error: errorClaimants, isFetching: isFetchingClaimants } = useGetClaimantsDropdown();
    const { status: statusAdjusters, data: adjusters, error: errorAdjusters, isFetching: isFetchingAdjusters } = useGetAdjustersDropdown();
    const { status: statusClients, data: clients, error: errorClients, isFetching: isFetchingClients } = useGetClientsDropdown();
    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsDropdown();
    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersDropdown();

    const claimantsSorted = claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName));
    const adjustersSorted = adjusters?.sort((a, b) => -b.lastName.localeCompare(a.lastName) || -b?.firstName.localeCompare(a?.firstName));
    const therapistsSorted = therapists?.sort((a, b) => -b.name.localeCompare(a.name) || -b.address.localeCompare(a.address));
    const clientsSorted = clients?.sort((a, b) => -b.client.localeCompare(a.client));
    const employersSorted = employers?.sort((a, b) => -b.name.localeCompare(a.name));

    return (
         <Box sx={{border: 1, padding: 1}}>
          <Grid container>
            {/* assign */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="assign">Assign:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>
                  <select
                  id='assign'
                  onChange={(e) => handleChangeSearch(e, 'assign')}
                  value={searchValAdvanced.assign ? searchValAdvanced.assign : ''}
                  >
                    <option value={searchValAdvanced.assign ? searchValAdvanced.assign : ""}>{
                      searchValAdvanced.assign ? searchValAdvanced.assign : ""}
                    </option>
                    <option value={""}>
                      {""}
                    </option>
                    {careCoordinators.filter((x) => x.Initials !== searchValAdvanced.assign).map((n) => (
                        <option key={n.Initials} value={n.Initials}>{n.Initials}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </Grid>
            {/* service */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="service">Service:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>
                  <select
                  id='service'
                  onChange={(e) => handleChangeSearch(e, 'service')}
                  value={searchValAdvanced.service ? searchValAdvanced.service : ''}
                  >
                    <option value={searchValAdvanced.service ? searchValAdvanced.service : ""}>{
                      searchValAdvanced.service ? searchValAdvanced.service : ""}
                    </option>
                    {services.filter((x) => x.service !== searchValAdvanced.service).map((n) => (
                        <option key={n.service} value={n.service}>{n.service}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </Grid>
            {/* claimant */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="claimant">Claimant:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>

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

                  {/* <input 
                  type='text' 
                  style={{marginRight: 10, padding: 5}}
                  onChange={(e) => handleChangeSearch(e, 'claimant')}
                  value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
                  /> */}

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
                  id='claimant'
                  onChange={(e) => handleChangeSearch(e, 'claimant')}
                  value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
                  >
                    <option value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ""}>
                      {searchValAdvanced.claimant ? searchValAdvanced.claimant : "Select"}
                    </option>
                    {searchValAdvanced.claimant &&
                    <option value="">
                      {"Select"}
                    </option>
                    }
                    {claimantsSorted?.filter((x) => `${x.lastName}, ${x.firstName}` !== searchValAdvanced.claimant).map((n) => (
                        <option key={n.claimantId} value={`${n.lastName}, ${n.firstName}`}>
                          {`${n.lastName}, ${n.firstName}`}
                        </option>
                    ))}
                  </select>

                </Grid>
              </Grid>
            </Grid>
            {/* employer */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="employer">Employer:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>

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
                  id='employer'
                  onChange={(e) => handleChangeSearch(e, 'employer')}
                  value={searchValAdvanced.employer ? searchValAdvanced.employer : ''}
                  >
                    <option value={searchValAdvanced.employer ? searchValAdvanced.employer : ""}>
                      {searchValAdvanced.employer ? searchValAdvanced.employer : "Select"}
                    </option>
                    {searchValAdvanced.employer &&
                    <option value="">
                      {"Select"}
                    </option>
                    }
                    {employersSorted?.filter((x) => `${x.name}` !== searchValAdvanced.employer)?.map((n) => (
                        <option key={n.employerId} value={`${n.name}`}>
                          {`${n.name}`}
                        </option>
                    ))}
                  </select>

                </Grid>
              </Grid>
            </Grid>
            {/* claimNumber */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="claimNumber">Claim #:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>

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
              </Grid>
            </Grid>
            {/* adjuster */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="adjuster">Adjuster:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>

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
                  id='adjuster'
                  onChange={(e) => handleChangeSearch(e, 'adjuster')}
                  value={searchValAdvanced.adjuster ? searchValAdvanced.adjuster : ''}
                  >
                    <option value={searchValAdvanced.adjuster ? searchValAdvanced.adjuster : ""}>
                      {searchValAdvanced.adjuster ? searchValAdvanced.adjuster : "Select"}
                    </option>
                    {searchValAdvanced.adjuster &&
                    <option value="">
                      {"Select"}
                    </option>
                    }
                    {adjustersSorted?.filter((x) => `${x.lastName}, ${x.firstName} | ${x.client}` !== searchValAdvanced.adjuster).map((n) => (
                        <option key={n.adjusterId} value={`${n.lastName}, ${n.firstName} | ${n.client}`}>
                          {`${n.lastName}, ${n.firstName} | ${n.client}`}
                        </option>
                    ))}
                  </select>

                </Grid>
              </Grid>
            </Grid>
            {/* client */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="client">Client:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>

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
                  id='client'
                  onChange={(e) => handleChangeSearch(e, 'client')}
                  value={searchValAdvanced.client ? searchValAdvanced.client : ''}
                  >
                    <option value={searchValAdvanced.client ? searchValAdvanced.client : ""}>
                      {searchValAdvanced.client ? searchValAdvanced.client : "Select"}
                    </option>
                    {searchValAdvanced.client &&
                    <option value="">
                      {"Select"}
                    </option>
                    }
                    {clientsSorted?.filter((x) => `${x.client}` !== searchValAdvanced.client)?.map((n) => (
                        <option key={n.clientId} value={`${n.client}`}>
                          {`${n.client}`}
                        </option>
                    ))}
                  </select>

                </Grid>
              </Grid>
            </Grid>
            {/* referralStatus */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="referralStatus">Referral Status:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>
                  <select
                  id='referralStatus'
                  onChange={(e) => handleChangeSearch(e, 'referralStatus')}
                  value={searchValAdvanced.referralStatus ? searchValAdvanced.referralStatus : ''}
                  >
                    {searchValAdvanced.referralStatus &&
                    <option value="">
                      {""}
                    </option>
                    }
                    <option value={searchValAdvanced.referralStatus ? searchValAdvanced.referralStatus : ""}>
                      {searchValAdvanced.referralStatus ? searchValAdvanced.referralStatus : ""}
                    </option>
                    {['Open', 'Hold', 'Cancel', 'Complete', 'Reschedule'].filter((x) => x !== searchValAdvanced.referralStatus).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </Grid>
            {/* ptStatus */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="ptStatus">PT Status:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>
                  <select
                  id='ptStatus'
                  onChange={(e) => handleChangeSearch(e, 'ptStatus')}
                  value={searchValAdvanced.ptStatus ? searchValAdvanced.ptStatus : ''}
                  >
                    {searchValAdvanced.ptStatus &&
                    <option value="">
                      {""}
                    </option>
                    }
                    <option value={searchValAdvanced.ptStatus ? searchValAdvanced.ptStatus : ""}>
                      {searchValAdvanced.ptStatus ? searchValAdvanced.ptStatus : ""}
                    </option>
                    {['Active', 'Follow-Up', 'Hold', 'Discharge'].filter((x) => x !== searchValAdvanced.ptStatus).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </Grid>
            {/* billingStatus */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="billingStatus">Billing Status:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>
                  <select
                  id='billingStatus'
                  onChange={(e) => handleChangeSearch(e, 'billingStatus')}
                  value={searchValAdvanced.billingStatus ? searchValAdvanced.billingStatus : ''}
                  >
                    {searchValAdvanced.billingStatus &&
                    <option value="">
                      {""}
                    </option>
                    }
                    <option value={searchValAdvanced.billingStatus ? searchValAdvanced.billingStatus : ""}>
                      {searchValAdvanced.billingStatus ? searchValAdvanced.billingStatus : ""}
                    </option>
                    {['Active', 'Complete'].filter((x) => x !== searchValAdvanced.billingStatus).map((n) => (
                        <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </Grid>
              </Grid>
            </Grid>
            <Box width="100%"/>
            {/* therapist */}
            <Grid item>
              <Grid container>
                <Grid item>
                  <label htmlFor="therapist">Therapist:</label>
                </Grid>
                <Box width="100%"/>
                <Grid item>

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
                  id='therapist'
                  onChange={(e) => handleChangeSearch(e, 'therapist')}
                  value={searchValAdvanced.therapist ? searchValAdvanced.therapist : ''}
                  >
                    <option value={searchValAdvanced.therapist ? searchValAdvanced.therapist : ""}>
                      {searchValAdvanced.therapist ? searchValAdvanced.therapist : "Select"}
                    </option>
                    {searchValAdvanced.therapist &&
                    <option value="">
                      {"Select"}
                    </option>
                    }
                    {therapistsSorted?.filter((x) => `${x.name} :: ${x.address}, ${x.city}, ${x.state} ${x.zip}` !== searchValAdvanced.therapist).map((n) => (
                        <option key={n.therapistId} value={`${n.name} :: ${n.address}, ${n.city}, ${n.state} ${n.zip}`}>
                          {`${n.name} :: ${n.address}, ${n.city}, ${n.state} ${n.zip}`}
                        </option>
                    ))}
                  </select>

                </Grid>
                <Grid item sx={{paddingLeft: 1}}>
                  {Object.keys(searchValAdvanced).length > 0 &&
                  <button onClick={handleClearEntireSearch}>Clear Search</button>
                  }
                </Grid>
              </Grid>
            </Grid>
         </Grid>
        </Box>
    );
}