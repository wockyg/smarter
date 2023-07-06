import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from './main/MainPage';

import AddFormContextProvider from "./contexts/AddFormContext";
import SelectedClaimContextProvider from './contexts/SelectedClaimContext';
import SearchContextProvider from './contexts/SearchContext';
import DetailsContextProvider from './contexts/DetailsContext';


function App() {

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

  return (
    <div className="App">
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
}

export default App;