import SmarterNavbar from './SmarterNavbar';
import AddFormModal from '../form-components/AddFormModal';
import MainTabs from './MainTabs'
import SelectedClaimTabs from '../claim-info/SelectedClaimTabs'
import DocumentTester from '../document-templates/DocumentTester';

export default function MainPage() {

    return (
      <>
      <SmarterNavbar />
      <AddFormModal />
      <MainTabs />
      <SelectedClaimTabs />
      {/* <DocumentTester /> */}
      </>
    );
}