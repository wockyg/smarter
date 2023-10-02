import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from './1-main/MainPage';

import AddFormContextProvider from "./contexts/AddFormContext";
import SelectedClaimContextProvider from './contexts/SelectedClaimContext';
import SearchContextProvider from './contexts/SearchContext';
import DetailsContextProvider from './contexts/DetailsContext';

import { useAuth0 } from "@auth0/auth0-react";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const { isLoading, isAuthenticated, error, user, loginWithRedirect } = useAuth0();

  const router = createBrowserRouter([
    {
      path: "/:id",
      element: <MainPage />,
    },
    {
      path: "/",
      element: <MainPage />,
    },
  ]);

  const handleClickLogin = async () => {
    await loginWithRedirect();
    console.log("Login success");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Oops... {error.message}</div>;
  }

  // console.log(isAuthenticated);

  if (isAuthenticated) {
    return (
      <div className="App" style={{background: '#FFFFFF', height: '100vh'}}>
        <SelectedClaimContextProvider>
        <SearchContextProvider>
        <DetailsContextProvider>
        <AddFormContextProvider>
            <RouterProvider router={router} />
        </AddFormContextProvider>
        </DetailsContextProvider>
        </SearchContextProvider>
        </SelectedClaimContextProvider>
      </div>
    );
  } else {
    return loginWithRedirect();
  }
}

export default App;