// import '../searchBar.css';
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { handleChangeSearch } from '../7-util/HelperFunctions';

export default function ServiceSelect(props) {

  const { searchVal, setSearchVal } = props;

  return (
    <>
        <label htmlFor="service" style={{display: 'block'}}>Assign:</label>
        <select
        id='service'
        onChange={(e) => handleChangeSearch(e, 'service', searchVal, setSearchVal)}
        value={searchVal.service ? searchVal.service : ''}
        >
          <option value="">
            {"--"}
          </option>
          {careCoordinators?.map((n) => (
              <option key={n.Initials} value={n.Initials}>{n.Initials}</option>
          ))}
        </select>
    </>
  );
  
};