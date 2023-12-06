import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

import {setDefaults, fromAddress, geocode, RequestType} from "react-geocode";

export default function useAddTherapist() {

  setDefaults({
    key: "AIzaSyDZTDhDWFKMSUkvPEzKEVEyNCzZh0SFTw4",
    language: "en",
    region: "es",
    });

  const queryClient = useQueryClient();

  const addTherapist = (values) => {

    const {address, city, state, zip} = values;

    fromAddress(`${address}, ${city}, ${state} ${zip}`)
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            console.log("new therapist coordinates:", lat, lng);
            api.post('/therapists', 
                  { 
                    'name': values.name,
                    'address': values.address,
                    'suite': values.suite.length > 0 ? values.suite : null,
                    'bldg': values.bldg.length > 0 ? values.bldg : null,
                    'unit': values.unit.length > 0 ? values.unit : null,
                    'floor': values.floor.length > 0 ? values.floor : null,
                    'city': values.city,
                    'state': values.state,
                    'zip': values.zip,
                    'lat': lat || null,
                    'lon': lng || null,
                    'bulkBillingId': values.bulkBillingId > 0 ? values.bulkBillingId : null,
                    'phone': values.phone,
                    'phoneExt': values.phoneExt.length > 0 ? values.phoneExt : null,
                    'fax': values.fax.length > 0 ? values.fax : null,
                    'contact': values.contact.length > 0 ? values.contact : null,
                    'contact2': values.contact2.length > 0 ? values.contact2 : null,
                    'email': values.email.length > 0 ? values.email : null,
                    'email2': values.email2.length > 0 ? values.email2 : null,
                    'spanish': values.spanish.length > 0 ? values.spanish[0] : null,
                    'fceTier': values.fceTier.length > 0 ? values.fceTier : null,
                    'fceAgreement': values.fceAgreement.length > 0 ? values.fceAgreement : null,
                    'fceAgreementStatus': values.fceAgreementStatus.length > 0 ? values.fceAgreementStatus : null,
                    // 'fceAgreementTimestamp': `${values.fceAgreementTimestamp}`,
                    'fce': values.fce.length > 0 ? values.fce[0] : null,
                    'fceRate': values.fceRate > 0 ? values.fceRate : null,
                    'ppd': values.ppd.length > 0 ? values.ppd[0] : null,
                    'ppdRate': values.ppdRate > 0 ? values.ppdRate : null,
                    'dptAgreement': values.dptAgreement.length > 0 ? values.dptAgreement : null,
                    'dptAgreementStatus': values.dptAgreementStatus.length > 0 ? values.dptAgreementStatus : null,
                    // 'dptAgreementTimestamp': `${values.dptAgreementTimestamp}`,
                    'dpt': values.dpt.length > 0 ? values.dpt[0] : null,
                    'dailyRate': values.dailyRate > 0 ? values.dailyRate : null,
                    'evalRate': values.evalRate > 0 ? values.evalRate : null,
                    'combinedRate': values.combinedRate > 0 ? values.combinedRate : null,
                    'wcwhAgreement': values.wcwhAgreement.length > 0 ? values.wcwhAgreement : null,
                    'wcwhAgreementStatus': values.wcwhAgreementStatus.length > 0 ? values.wcwhAgreementStatus : null,
                    // 'wcwhAgreementTimestamp': `${values.wcwhAgreementTimestamp}`,
                    'wcwhFirst2Hrs': values.wcwhFirst2Hrs > 0 ? values.wcwhFirst2Hrs : null,
                    'wcwhAdditionalHour': values.wcwhAdditionalHour > 0 ? values.wcwhAdditionalHour : null,
                    'billingContact': values.billingContact.length > 0 ? values.billingContact : null,
                    'billingPhone': values.billingPhone.length > 0 ? values.billingPhone : null,
                    'billingPhoneExt': values.billingPhoneExt.length > 0 ? values.billingPhoneExt : null,
                    'billingFax': values.billingFax.length > 0 ? values.billingFax : null,
                    'billingEmail': values.billingEmail.length > 0 ? values.billingEmail : null,
                    'billingContact2': values.billingContact2.length > 0 ? values.billingContact2 : null,
                    'billingPhone2': values.billingPhone2.length > 0 ? values.billingPhone2 : null,
                    'billingPhone2Ext': values.billingPhone2Ext.length > 0 ? values.billingPhone2Ext : null,
                    'billingFax2': values.billingFax2.length > 0 ? values.billingFax2 : null,
                    'billingEmail2': values.billingEmail2.length > 0 ? values.billingEmail2 : null,
                    'billsMonthly': values.billsMonthly.length > 0 ? values.billsMonthly[0] : null,
                    'billingProfile': values.billingProfile.length > 0 ? values.billingProfile : null,
                    'DPT_AN': values.DPT_AN.length > 0 ? values.DPT_AN[0] : null,
                    'PPD_GL': values.PPD_GL.length > 0 ? values.PPD_GL[0] : null,
                    'DPT_AQ': values.DPT_AQ.length > 0 ? values.DPT_AQ[0] : null,
                    'DPT_MT': values.DPT_MT.length > 0 ? values.DPT_MT[0] : null,
                    'DPT_OT': values.DPT_OT.length > 0 ? values.DPT_OT[0] : null,
                    'DPT_WC': values.DPT_WC.length > 0 ? values.DPT_WC[0] : null,
                    'DPT_WH': values.DPT_WH.length > 0 ? values.DPT_WH[0] : null,
                    'DPT_TH': values.DPT_TH.length > 0 ? values.DPT_TH[0] : null,
                    'doNotUseDPT': values.doNotUseDPT.length > 0 ? values.doNotUseDPT[0] : null,
                    // 'doNotUseFCE': values.doNotUseFCE.length > 0 ? values.doNotUseFCE[0] : null,
                    // 'doNotUsePPD': values.doNotUsePPD.length > 0 ? values.doNotUsePPD[0] : null,
                    'doNotUseDPTReason': values.doNotUseDPTReason.length > 0 ? values.doNotUseDPTReason : null,
                    'notes': values.notes.length > 0 ? values.notes : null,
                    'ptProfile': values.ptProfile.length > 0 ? values.ptProfile : null,
                  })
                  .then(response => {
                    const data = response.data;
                    console.log("submit data:", data);
                    queryClient.invalidateQueries('therapists');
                    queryClient.invalidateQueries('therapistsearchall');
                    queryClient.invalidateQueries('therapistsdropdown');
                    queryClient.invalidateQueries('therapistsaddresses');
                    return data;
                  });

        })
        .catch(console.error);
    }
    
  return useMutation( (values) => addTherapist(values), 
                      {onSuccess: () => {
                      console.log('successfully added therapist...');
                      }});

}