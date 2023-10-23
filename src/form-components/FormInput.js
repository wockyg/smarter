import { useField } from 'formik';
import '../forms.css'

export default function FormInput({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}><u>{label}</u></label>
        {meta.touched && meta.error ? (
         <input className="redBorder" {...field} {...props} />
       ) : <input {...field} {...props} />}
    </>
  );
  
};