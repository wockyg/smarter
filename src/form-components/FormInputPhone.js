import { useField } from 'formik';
import '../forms.css'

const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

const handleInput = (value) => {
  return (
    value.replace(phoneRegex, '($1) $2-$3')
  )
}


export default function FormInputPhone({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <input className="redBorder" {...field} {...props} value={handleInput(meta.value)} />
        ) : <input {...field} {...props} value={handleInput(meta.value)}/>}
    </>
  );
  
};