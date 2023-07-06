import React, { useContext } from 'react';
import { AddFormContext } from '../contexts/AddFormContext';
import AdjusterAddForm from './AdjusterAddForm';
import AttorneyAddForm from './AttorneyAddForm';
import CasemanagerAddForm from './CasemanagerAddForm';
import ClaimantAddForm from './ClaimantAddForm';
import ClientAddForm from './ClientAddForm';
import EmployerAddForm from './EmployerAddForm';
import PhysicianAddForm from './PhysicianAddForm';
import ReferralAddForm from './ReferralAddForm';
import TherapistAddForm from './TherapistAddForm';
import AgreementAddForm from './AgreementAddForm';

export default function AddFormController() {

    const { modalParty } = useContext(AddFormContext);

    return (
        <>
            {modalParty === 'adjuster' &&
                <AdjusterAddForm />
            }

            {modalParty === 'attorney' &&
                <AttorneyAddForm />
            }

            {modalParty === 'casemanager' &&
                <CasemanagerAddForm />           
            }

            {modalParty === 'claimant' &&
                <ClaimantAddForm />           
            }

            {modalParty === 'client' &&
                <ClientAddForm />         
            }

            {modalParty === 'employer' &&
                <EmployerAddForm />
            }

            {modalParty === 'physician' &&
                <PhysicianAddForm />
            }

            {modalParty === 'therapist' &&
                <TherapistAddForm />
            }

            {modalParty === 'referral' &&
                <ReferralAddForm />
            }
            {modalParty === 'agreement' &&
                <AgreementAddForm />
            }

        </>
    )
}