import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';
import { weekdays } from '../lookup-tables/lookup_weekdays';

import logo from '../img/logo.png';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Create styles
const styles = StyleSheet.create({
  page: {
    // backgroundColor: "blue",
    color: "black",
    position: 'relative',
  },
  section: {
    margin: 10,
    paddingLeft: 60,
    paddingRight: 60,
  },
  text: {
    fontSize: 8,
    fontFamily: 'Helvetica',
  },
  paragraph: {
    fontSize: 8,
    fontFamily: 'Helvetica',
    lineHeight: '150%',
  },
  textGray: {
    fontSize: 8,
    color: "#BDC3C7",
  },
  textWhite: {
    fontSize: 4,
    color: "white",
  },
  gray: {
    marginLeft: 80,
    marginRight: 80,
    padding: 10,
    backgroundColor: "#BDC3C7",
  },
});

export default function ConfirmationLetter(props) {


    const { selectedClaim } = props;

    const assign = careCoordinators?.filter((row) => row.Initials === selectedClaim?.assign)[0];
  
    const today = new Date();
    const month = today.getMonth() + 1; 
    const day = today.getDate();
    const year = today.getFullYear();

    const weekday = today.getDay();

    const apptDate = new Date(selectedClaim.apptDate)
    const apptWeekday = apptDate.getDay();
    const apptMonth = apptDate.getMonth();
    const apptDay = apptDate.getDate();

    const apptDaySuffix = (apptDay === 1 || apptDay === 21 || apptDay === 31) ? 'st' : ((apptDay === 2 || apptDay === 22) ? 'nd' : (apptDay === 3 || apptDay === 23) ? 'rd' : 'th')


    const weekdayString = weekdays.filter(w => w.day === weekday)[0].dayString;

    const serviceSpelledOut = services?.filter((s) => s.service === selectedClaim?.service)[0]?.serviceSpelledOut;
    const serviceSpelledOutFinal = `${serviceSpelledOut} ${selectedClaim?.service !== 'PPD' && !selectedClaim?.service !== 'PPD-GL' && 'Evaluation'}`

    const serviceSpelledOutSpanish = `${selectedClaim?.service === 'DPT' ? 'Evaluación de fisioterapia' : 'Evaluación de capacidad funcional'}`

    const formatDate = (month < 10 ? `0${month}` : month) + '/' + (day < 10 ? `0${day}` : day) +  '/' + year;

    const header = selectedClaim?.spanishSpeaking
    ? 
    'Carta de confirmación'
    :
    'Confirmation Letter';

    const subject  = selectedClaim?.spanishSpeaking ? serviceSpelledOutSpanish : serviceSpelledOutFinal;

    const salutation1 = (selectedClaim?.spanishSpeaking
    ? 
    selectedClaim?.claimantGender === "Male" ? 'Sr. ' : 'Sra. '
    :
    selectedClaim?.claimantGender === "Male" ? 'Mr. ' : 'Ms. ')
    +
    selectedClaim?.claimantLast;

    const intro = selectedClaim?.spanishSpeaking
    ? 
    `Trabajamos en conjunto con su compañía de seguros y su médico para coordinar la ${serviceSpelledOutFinal} que ha sido ordenado por usted.`
    :
    `We are working in conjunction with your insurance company and your physician to coordinate the ${serviceSpelledOutFinal} that has been ordered for you.`;

    const apptIntro = selectedClaim?.spanishSpeaking
    ? 
    'Fijarse en la siguiente información sobre la cita:'
    :
    'Appointment Information Below:';

    const dateHeading = selectedClaim?.spanishSpeaking
    ? 
    'FECHA:'
    :
    'DATE:';

    const timeHeading = selectedClaim?.spanishSpeaking
    ? 
    'HORA:'
    :
    'TIME:';

    const locationHeading = selectedClaim?.spanishSpeaking
    ? 
    'LUGAR:'
    :
    'LOCATION:';

    const contactHeading = selectedClaim?.spanishSpeaking
    ? 
    'CONTACTO:'
    :
    'CONTACT:';

    const frontOffice = selectedClaim?.spanishSpeaking
    ? 
    'La oficina:'
    :
    'Front office:';

    const arriveEarly = selectedClaim?.spanishSpeaking
    ? 
    '(por favor llegar unos minutos antes para completar el papeleo)'
    :
    '(please arrive a few minutes early to fill out paperwork)';

    const dressAndDuration = selectedClaim?.spanishSpeaking
    ? 
    `Por favor, vestirse cómodo (preferiblemente pantalones de ejercicio y zapatos atléticos). La consulta completa durará aproximadamente ${selectedClaim?.serviceGeneral === 'DPT' ? '1-2' : '2-4'} horas.`
    :
    `Please dress comfortably (sweatpants and sneakers preferably) and allow approximately ${selectedClaim?.serviceGeneral === 'DPT' ? '1-2' : '2-4'} hrs for the appointment.`;

    const questions = selectedClaim?.spanishSpeaking
    ? 
    `Si hay alguna pregunta o duda sobre los aspectos clínicos del examen, se puede llamar la oficina de la clínica directamente: ${selectedClaim?.therapistPhone}. Cuestiones de programación se puede dirigir a su coordinador de cuidado, ${assign?.TeamMember}: ${assign?.phone}.`
    :
    `If you have any questions or concerns about the clinical aspects of the testing, you may reach the physical therapy office staff directly at ${selectedClaim?.therapistPhone}. If you have any questions or concerns regarding scheduling, please reach out to your assigned care coordinator, ${assign?.TeamMember}, at ${assign?.phone}.`;

    const salutation2 = selectedClaim?.spanishSpeaking
    ? 
    'Sinceramente,'
    :
    'Sincerely,';

    return (
        
        <Document>
            <Page size='LETTER' style={styles.page}>
                <Image src={logo} style={{ position: 'absolute', zIndex: -1, top: 10, left: 455, width: 85 }} />
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.textWhite}>Dummy</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>{header}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{formatDate}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>{`${selectedClaim.claimantFirst} ${selectedClaim.claimantLast}`}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{`${selectedClaim.claimantAddress}`}</Text>
                    <Text style={styles.textWhite}>Dummy</Text>
                    <Text style={styles.text}>{`${selectedClaim.claimantCity}, ${selectedClaim.claimantState} ${selectedClaim.claimantZip}`}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>RE: {subject}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{salutation1}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        {intro}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{apptIntro}</Text>
                </View>
                
                <View style={styles.gray}>
                    <Text style={styles.text}>{dateHeading}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{timeHeading}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{locationHeading}</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.textGray}>Dummy</Text>
                    <Text style={styles.text}>{contactHeading}</Text>

                    <Text style={{ position: 'absolute', top: 10, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{weekdayString}, {monthNames[apptMonth]} {apptDay}{apptDaySuffix}</Text>
                    <Text style={{ position: 'absolute', top: 28, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{selectedClaim.apptTime} {arriveEarly}</Text>
                    <Text style={{ position: 'absolute', top: 45, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{selectedClaim.therapist}</Text>
                    <Text style={{ position: 'absolute', top: 55, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{selectedClaim.therapistAddress}</Text>
                    <Text style={{ position: 'absolute', top: 65, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{selectedClaim.therapistCity}, {selectedClaim.therapistState} {selectedClaim.therapistZip}</Text>
                    <Text style={{ position: 'absolute', top: 81, left: 100, fontSize: 8, fontFamily: 'Helvetica' }}>{frontOffice} {selectedClaim.therapistPhone}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        {dressAndDuration}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>
                        {questions}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{salutation2}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>{assign?.TeamMember}</Text>
                    <Text style={styles.text}>Direct phone#: {assign?.phone}</Text>
                    <Text style={styles.text}>Email: {assign?.email}</Text>
                    <Text style={styles.text}>Defined Physical Therapy</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.text}>CC Adjuster: {selectedClaim?.adjuster}</Text>
                    <Text style={styles.text}>CC Case Manager: {selectedClaim?.casemanager}</Text>
                    <Text style={styles.text}>CC Attorney(s): {selectedClaim?.plaintiffAttorney && `${selectedClaim?.plaintiffAttorney} (P)`}{selectedClaim?.defenseAttorney && `${selectedClaim?.defenseAttorney} (D)`}</Text>
                </View>
            </Page>
        </Document>
    );
}