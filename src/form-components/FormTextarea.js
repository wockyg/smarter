import { useField } from 'formik';
import '../forms.css'

export default function FormTextarea({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name} style={{display: 'block'}}>{label}</label>
        {meta.touched && meta.error ? (
         <textarea className="redBorder" {...field} {...props} />
       ) : <textarea {...field} {...props} />}
    </>
  );
  
};