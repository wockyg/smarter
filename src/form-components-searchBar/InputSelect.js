// import '../searchBar.css';
import { handleChangeSearch } from '../7-util/HelperFunctions';

export default function InputSelect(props) {

  const { searchVal, setSearchVal, field, label, options } = props;

  return (
    <>
        <label htmlFor={field} style={{display: 'block'}}>{`${label}`}</label>
        <select
        id={field}
        onChange={(e) => handleChangeSearch(e, field, searchVal, setSearchVal)}
        value={searchVal[field] ? searchVal[field] : ''}
        >
          <option value="">
            {"--"}
          </option>
          {options?.map((n) => (
              <option key={n} value={n}>{n}</option>
          ))}
        </select>
    </>
  );
  
};