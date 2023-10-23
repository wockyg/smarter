import { useField } from 'formik';
import '../forms.css'

export default function FormSelectAttorneyType({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>Select</option>
          {['Defense', 'Plaintiff'].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
         </select>
       ) : <select {...field} {...props}>
        <option value=''>Select</option>
        {['Defense', 'Plaintiff'].map((c) => (
        <option key={c} value={c}>{c}</option>
        ))}
        </select>}
    </>
  );
  
};