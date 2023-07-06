import { useField } from 'formik';
import '../forms.css'

export default function FormSelectState({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>-</option>
          {props.states && props.states.map((s) => (
            <option key={s.abbrev} value={s.abbrev}>{s.abbrev}</option>
          ))}
         </select>
       ) : <select {...field} {...props}>
        <option value=''>-</option>
        {props.states && props.states.map((s) => (
            <option key={s.abbrev} value={s.abbrev}>{s.abbrev}</option>
          ))}
        </select>}
    </>
  );
  
};