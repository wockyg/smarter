import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddTherapist() {

  const queryClient = useQueryClient();

  const addTherapist = (values) => api
                              .post('/therapists', 
                              { 
                                'name': `${values.name}`,
                                'address': `${values.address}`,
                                'suite': `${values.suite}`,
                                'bldg': `${values.bldg}`,
                                'unit': `${values.unit}`,
                                'floor': `${values.floor}`,
                                'city': `${values.city}`,
                                'state': `${values.state}`,
                                'zip': `${values.zip}`,
                                'bulkBillingId': values.bulkBillingId > 0 ? values.bulkBillingId : null,
                                'phone': `${values.phone}`,
                                'phoneExt': `${values.phoneExt}`,
                                'fax': `${values.fax}`,
                                'contact': `${values.contact}`,
                                'contact2': `${values.contact2}`,
                                'email': `${values.email}`,
                                'email2': `${values.email2}`,
                                'spanish': values.spanish.length > 0 ? values.spanish[0] : null,
                                'fceTier': `${values.fceTier}`,
                                'fceAgreement': `${values.fceAgreement}`,
                                'fceAgreementStatus': `${values.fceAgreementStatus}`,
                                'fceAgreementTimestamp': `${values.fceAgreementTimestamp}`,
                                'fce': values.fce.length > 0 ? values.fce[0] : null,
                                'fceRate': values.fceRate > 0 ? values.fceRate : null,
                                'ppd': values.ppd.length > 0 ? values.ppd[0] : null,
                                'ppdRate': values.ppdRate > 0 ? values.ppdRate : null,
                                'dptAgreement': `${values.dptAgreement}`,
                                'dptAgreementStatus': `${values.dptAgreementStatus}`,
                                'dptAgreementTimestamp': `${values.dptAgreementTimestamp}`,
                                'dpt': values.dpt.length > 0 ? values.dpt[0] : null,
                                'dailyRate': values.dailyRate > 0 ? values.dailyRate : null,
                                'evalRate': values.evalRate > 0 ? values.evalRate : null,
                                'combinedRate': values.combinedRate > 0 ? values.combinedRate : null,
                                'wcwhAgreement': `${values.wcwhAgreement}`,
                                'wcwhAgreementStatus': `${values.wcwhAgreementStatus}`,
                                'wcwhAgreementTimestamp': `${values.wcwhAgreementTimestamp}`,
                                'wcwhFirst2Hrs': values.wcwhFirst2Hrs > 0 ? values.wcwhFirst2Hrs : null,
                                'wcwhAdditionalHour': values.wcwhAdditionalHour > 0 ? values.wcwhAdditionalHour : null,
                                'billingContact': `${values.billingContact}`,
                                'billingPhone': `${values.billingPhone}`,
                                'billingPhoneExt': `${values.billingPhoneExt}`,
                                'billingFax': `${values.billingFax}`,
                                'billingEmail': `${values.billingEmail}`,
                                'billingContact2': `${values.billingContact2}`,
                                'billingPhone2': `${values.billingPhone2}`,
                                'billingPhone2Ext': `${values.billingPhone2Ext}`,
                                'billingFax2': `${values.billingFax2}`,
                                'billingEmail2': `${values.billingEmail2}`,
                                'billsMonthly': values.billsMonthly.length > 0 ? values.billsMonthly[0] : null,
                                'billingProfile': `${values.billingProfile}`,
                                'DPT_AN': values.DPT_AN.length > 0 ? values.DPT_AN[0] : null,
                                'PPD_GL': values.PPD_GL.length > 0 ? values.PPD_GL[0] : null,
                                'DPT_AQ': values.DPT_AQ.length > 0 ? values.DPT_AQ[0] : null,
                                'DPT_MT': values.DPT_MT.length > 0 ? values.DPT_MT[0] : null,
                                'DPT_OT': values.DPT_OT.length > 0 ? values.DPT_OT[0] : null,
                                'DPT_WC': values.DPT_WC.length > 0 ? values.DPT_WC[0] : null,
                                'DPT_WH': values.DPT_WH.length > 0 ? values.DPT_WH[0] : null,
                                'DPT_TH': values.DPT_TH.length > 0 ? values.DPT_TH[0] : null,
                                'doNotUseDPT': values.doNotUseDPT.length > 0 ? values.doNotUseDPT[0] : null,
                                'doNotUseFCE': values.doNotUseFCE.length > 0 ? values.doNotUseFCE[0] : null,
                                'doNotUsePPD': values.doNotUsePPD.length > 0 ? values.doNotUsePPD[0] : null,
                                'doNotUseDPTReason': `${values.doNotUseDPTReason}`,
                                'notes': `${values.notes}`,
                                'ptProfile': `${values.ptProfile}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log("submit data:", data);
                                queryClient.invalidateQueries('therapists');
                                queryClient.invalidateQueries('therapistsearchall');
                                queryClient.invalidateQueries('therapistsdropdown');
                                return data;
                              });
    
  return useMutation( (values) => addTherapist(values), 
                      {onSuccess: () => {
                      console.log('successfully added therapist...');
                      }});

}