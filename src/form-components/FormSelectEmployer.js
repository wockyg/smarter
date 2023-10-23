import { useField } from 'formik';
import '../forms.css'

export default function FormSelectEmployer({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>Select</option>
          {props.employers && props.employers.map((e) => (
            <option key={e.employerId} value={e.employerId}>{e.name}</option>
          ))}
         </select>
       ) : <select {...field} {...props}>
        <option value=''>Select</option>
        {props.employers && props.employers.map((e) => (
            <option key={e.employerId} value={e.employerId}>{e.name}</option>
          ))}
        </select>}
    </>
  );
  
};