import { useField } from 'formik';
import '../forms.css'

export default function FormSelectBillingProtocol({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>-</option>
          <option value='Fax'>Fax</option>
          <option value='Email'>Email</option>
          <option value='Phone'>Phone</option>
         </select>
       ) : <select {...field} {...props}>
            <option value=''>-</option>
            <option value='Fax'>Fax</option>
            <option value='Email'>Email</option>
            <option value='Phone'>Phone</option>
          </select>}
    </>
  );
  
};