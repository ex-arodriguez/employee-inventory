import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import AdminPage from "./pages/admin";
import EmployeePage from "./pages/employee";
import { Provider, useSelector } from "react-redux";
import store from "./store";

function Index() {
  const session = useSelector((state) => state.session);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
      loader: () => {
        if (session.isAuthenticated && session.rol === "admin") {
          return null;
        } else {
          return redirect("/");
        }
      },
    },
    {
      path: "/employee",
      element: <EmployeePage />,
      loader: () => {
        if (session.isAuthenticated && session.rol === "employee") {
          return null;
        } else {
          return redirect("/");
        }
      },
    },
  ]);
  return <RouterProvider router={router} />;
}

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
