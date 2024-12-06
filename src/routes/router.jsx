import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "../pages/layout/RootLayout";
import ProtectedLayout from "../pages/layout/ProtectedLayout";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Main from "../pages/main";
import PasswordDetails from "../pages/main/components/password/details";
import CreatePassword from "../pages/main/components/password/create";
import EditPassword from "../pages/main/components/password/edit";
import Page404 from "../pages/error";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/password/:id" element={<PasswordDetails />} />
        <Route path="/password/edit/:id" element={<EditPassword />} />
        <Route path="/password/create" element={<CreatePassword />} />
      </Route>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: false,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
