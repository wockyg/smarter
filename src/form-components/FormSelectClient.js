import { useField } from 'formik';
import '../forms.css'

export default function FormSelectClient({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>Select</option>
          {props.clients && props.clients.map((c) => (
            <option key={c.clientId} value={c.clientId}>{c.client}</option>
          ))}
         </select>
       ) : <select {...field} {...props}>
        <option value=''>Select</option>
        {props.clients && props.clients.map((c) => (
            <option key={c.clientId} value={c.clientId}>{c.client}-{c.clientId}</option>
          ))}
        </select>}
    </>
  );
  
};