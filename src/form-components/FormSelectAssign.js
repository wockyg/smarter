import { useField } from 'formik';
import '../forms.css'
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators'

export default function FormSelectAssign({ label, ...props }) {

  const [field, meta] = useField(props);
  const { notes } = props;

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>-</option>
          {careCoordinators.map((c) => (
            <option key={c.Initials} value={c.Initials}>{c.Initials}</option>
          ))}
         </select>
       ) : <select {...field} {...props}>
        <option value=''>-</option>
        {careCoordinators.map((c) => (
        <option key={c.Initials} value={c.Initials}>{c.Initials}</option>
        ))}
        {notes &&
        <>
        <option value='DM'>DM</option>
        <option value='JR'>JR</option>
        </>
          }
        </select>}
    </>
  );
  
};