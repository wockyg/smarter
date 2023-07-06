import { useField } from 'formik';
import '../forms.css'

export default function FormSelectAgreementType({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>Select</option>
          <option value='Single Case'>Single Case</option>
          <option value='Network'>Network</option>
         </select>
       ) : <select {...field} {...props}>
            <option value=''>Select</option>
            <option value='Single Case'>Single Case</option>
            <option value='Network'>Network</option>
          </select>}
    </>
  );
  
};