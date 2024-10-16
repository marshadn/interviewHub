import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  // Redirect to sign-in if the user is not signed in
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <Header />
      <Outlet /> {/* This will render the child routes, like Dashboard */}
    </>
  );
}

export default App;
