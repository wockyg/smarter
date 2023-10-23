import { useField } from 'formik';
import '../forms.css'

export default function FormSelectGender({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>-</option>
          <option value='Male'>M</option>
          <option value='Female'>F</option>
         </select>
       ) : <select {...field} {...props}>
            <option value=''>-</option>
            <option value='Male'>M</option>
            <option value='Female'>F</option>
          </select>}
    </>
  );
  
};