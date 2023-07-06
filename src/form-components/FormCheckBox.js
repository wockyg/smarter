import { useField } from 'formik';
import '../forms.css'

export default function FormInput({ label, ...props }) {

  const [field, meta] = useField(props);

  return (
    <>
        <input {...field} {...props} />
    </>
  );
  
};