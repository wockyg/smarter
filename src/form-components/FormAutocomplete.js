import { useField } from 'formik';
import '../forms.css'
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function FormAutocomplete({ label, ...props }) {

  const [field, meta] = useField(props);


  return (
    <>
        <label htmlFor={props.name}>{label}</label>
        {meta.touched && meta.error ? (
          <>
            <Autocomplete
              // groupBy={(option) => option.state}
              style={{ width: 300 }}

              renderInput={(params) => (
                  <TextField
                  {...params}
                  onChange={props.handleChange}
                  margin="normal"
                  label="Claimant"
                  fullWidth
                  />
              )}
            />
          </>
       ) : (
      
      <>
       <input {...field} {...props} />
      </>
       
       )}
    </>
  );
  
};