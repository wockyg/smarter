import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddReferral() {


  const queryClient = useQueryClient();

  const addReferral = (values) => api
                              .post('/referrals', 
                              { 
                                'referralStatus': `${values.referralStatus}`,
                                'assign': `${values.assign}`,
                                'spanishSpeaking': values.spanishSpeaking.length > 0 ? values.spanishSpeaking[0] : null,
                                'translationNeeded': values.translationNeeded.length > 0 ? values.translationNeeded[0] : null,
                                'transportNeeded': values.transportNeeded.length > 0 ? values.transportNeeded[0] : null,
                                'postOp': values.postOp.length > 0 ? values.postOp[0] : null,
                                'service': `${values.service}`,
                                'serviceGeneral': `${values.serviceGeneral}`,
                                'jurisdiction': `${values.jurisdiction}`,
                                'bodyPart': `${values.bodyPart}`,
                                'icd10': `${values.icd10}`,
                                'approvedVisits': +values.approvedVisits > 0 ? +values.approvedVisits : null,
                                'odg': +values.odg > 0 ? +values.odg : null,
                                'evalAndTreat': values.evalAndTreat.length > 0 ? values.evalAndTreat[0] : null,
                                'apptDate': `${values.apptDate}`,
                                'apptTime': `${values.apptTime}`,
                                'claimNumber': `${values.claimNumber}`,
                                'claimantId': values.claimantId > 0 ? values.claimantId : null,
                                'therapistId': values.therapistId > 0 ? values.therapistId : null,
                                'adjusterId': values.adjusterId > 0 ? values.adjusterId : null,
                                'casemanagerId': values.casemanagerId > 0 ? values.casemanagerId : null,
                                'casemanager2Id': values.casemanager2Id > 0 ? values.casemanager2Id : null,
                                'physicianId': values.physicianId > 0 ? values.physicianId : null,
                                'plaintiffAttorneyId': values.plaintiffAttorneyId > 0 ? values.plaintiffAttorneyId : null,
                                'defenseAttorneyId': values.defenseAttorneyId > 0 ? values.defenseAttorneyId : null,
                                'FuDrDate': `${values.FuDrDate}`,
                                'billingNotes': `${values.billingNotes}`,
                                'claimantInfoFromAdjuster': values.claimantInfoFromAdjuster.length > 0 ? values.claimantInfoFromAdjuster[0] : null,
                                'rxFromAdjuster': values.rxFromAdjuster.length > 0 ? values.rxFromAdjuster[0] : null,
                                'demosFromAdjuster': values.demosFromAdjuster.length > 0 ? values.demosFromAdjuster[0] : null,
                                'ovnFromAdjuster': values.ovnFromAdjuster.length > 0 ? values.ovnFromAdjuster[0] : null,
                                'ptNotesFromAdjuster': values.ptNotesFromAdjuster.length > 0 ? values.ptNotesFromAdjuster[0] : null,
                                'jdFromAdjuster': values.jdFromAdjuster.length > 0 ? values.jdFromAdjuster[0] : null,
                                'mriFromAdjuster': values.mriFromAdjuster.length > 0 ? values.mriFromAdjuster[0] : null,
                                'postOpFromAdjuster': values.postOpFromAdjuster.length > 0 ? values.postOpFromAdjuster[0] : null,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('referrals');
                                queryClient.invalidateQueries('referralsOpen');
                                return data;
                              });
    
  return useMutation( (values) => addReferral(values), 
                      {onSuccess: () => {
                      console.log('successfully added referral...');
                      }});

}