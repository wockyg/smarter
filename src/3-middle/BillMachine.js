import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import useGetReferral from '../hooks/useGetReferral';
import useGetReferral_icd10 from '../hooks/useGetReferral_icd10';

import { useParams } from 'react-router-dom';

import ICD10Table from './ICD10Table';
import CPTTable from './CPTTable';
import HCFATemplateViewer from './HCFATemplateViewer';
import RowGenerator from './RowGenerator';
import ViewBills from './ViewBills';
import D1500ProgressStepper from './D1500ProgressStepper';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import PropTypes from 'prop-types';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function BillMachine() {

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);
    const { status: statusReferral_icd10, data: codeList, error: errorReferral_icd10, isFetching: isFetchingReferral_icd10 } = useGetReferral_icd10(+linkId);

    const { pendingD1500Id, pendingD1500Upload, uniqueDOS, split, numSplit } = useContext(SelectedClaimContext);

    const open =  Boolean(pendingD1500Id) || pendingD1500Upload;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    

    return (
      <>
      {selectedClaim?.billingStatus && codeList &&
      <Box sx={{ width: '100%' }}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Grid container>

            <Grid item xs={9.6}>

              <Grid container spacing={0}>
                <Grid item xs={5.3}>
                    <HCFATemplateViewer index={value} />
                </Grid>
                <Grid item xs={6.7} className='billRows'>
                  {/* TODO tabs for each dos if >1 */}
                  {split ?
                  <>
                  <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      {uniqueDOS.map(dos => (
                        <Tab label={dos} />
                      ))}
                      
                    </Tabs>
                  </Box>
                  {uniqueDOS.map((dos, i) => (
                    <CustomTabPanel value={value} index={i} sx={{padding: 0}}>
                      <Box sx={{height: 370, background: '#138D75', overflow: 'auto', padding: 1, position: "relative"}}>
                          {selectedClaim?.jurisdiction
                          ?
                          <RowGenerator codeList={codeList} index={i} />
                          :
                          'No jurisdicton set'
                          }
                          <Backdrop open={open} sx={{position: "absolute"}}>
                            {/* <CircularProgress /> */}
                            <D1500ProgressStepper index={i} />
                          </Backdrop>
                      </Box>
                    </CustomTabPanel>
                  ))}
                  </>
                  :
                  <Container disableGutters sx={{height: 370, background: '#138D75', overflow: 'auto', padding: 1, position: "relative"}}>
                      {selectedClaim?.jurisdiction
                      ?
                      <RowGenerator codeList={codeList} />
                      :
                      'No jurisdicton set'
                      }
                      <Backdrop open={open} sx={{position: "absolute"}}>
                        {/* <CircularProgress /> */}
                        <D1500ProgressStepper />
                      </Backdrop>
                  </Container>
                  }
                  
                    
                    <hr />
                    <Container disableGutters sx={{height: 370, background: '#138D75', overflow: 'auto', padding: 1}}>
                        <ViewBills />
                    </Container>
                </Grid>
              </Grid>

            </Grid>

            <Grid item xs={2.4} sx={{borderLeft: 1}}>
                <ICD10Table />
                <hr />
                {selectedClaim?.jurisdiction
                ?
                <CPTTable />
                :
                'No jurisdicton set'
                }
            </Grid>

          </Grid>
        </Box>
      </Box>
      }
      </>
    
    );
}