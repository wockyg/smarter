import { useField } from 'formik';
import '../forms.css'

export default function FormSelectVisits({ label, ...props }) {

  const [field, meta] = useField(props);

  const count = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
         <select className="redBorder" {...field} {...props}>
          <option value=''>-</option>
          {count.map(x => (<option key={x} value={x}>{x}</option>))}
         </select>
       ) : <select {...field} {...props}>
            <option value=''>-</option>
            {count.map(x => (<option key={x} value={x}>{x}</option>))}
          </select>}
    </>
  );
  
};