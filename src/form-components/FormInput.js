import { useField } from 'formik';
import '../forms.css'

export default function FormInput({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <input className="redBorder" {...field} {...props} />
       ) : <input {...field} {...props} />}
    </>
  );
  
};