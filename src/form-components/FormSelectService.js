import { useField } from 'formik';
import '../forms.css'
import {services} from '../lookup-tables/lookup_service'

export default function FormSelectService({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>-</option>
          {services.map((s) => (
            <option key={s.service} value={s.service}>{s.service}</option>
          ))}
         </select>
       ) : <select {...field} {...props}>
        <option value=''>-</option>
        {services.map((s) => (
            <option key={s.service} value={s.service}>{s.service}</option>
          ))}
        </select>}
    </>
  );
  
};