import { useField } from 'formik';
import '../forms.css'

export default function FormSelectAgreementStatus({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>Select</option>
          <option value='Agreed'>Agreed</option>
          <option value='Denied'>Denied</option>
          <option value='Prospect'>Prospect</option>
         </select>
       ) : <select {...field} {...props}>
            <option value=''>Select</option>
            <option value='Agreed'>Agreed</option>
            <option value='Denied'>Denied</option>
            <option value='Prospect'>Prospect</option>
          </select>}
    </>
  );
  
};