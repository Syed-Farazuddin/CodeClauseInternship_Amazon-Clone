import CheckoutPage from "./CheckoutPage";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { useEffect } from "react";
import { auth } from "./firebase.js";
import { useStateValue } from "./components/StateProvider";
import PaymentPage from "./components/PaymentPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51NPzygSEQOKz7pBzFO9AV0gAgyZ2YwTfbsPNOepLkxhMsIDbPykcK2KtqbuQ6q4Ou4PeZCFj3e500d1JkoSHCnVw00Q28xe0Nn"
);
function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    // Will only run once when the app component loads..
    auth.onAuthStateChanged((authUser) => {
      console.log("The user is ", authUser);
      if (authUser) {
        // User just logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // User logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <div>
              <LoginPage />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div>
              <Header />
              <HomePage />
            </div>
          }
        />
        <Route
          path="/payment"
          element={
            <div>
              <Header />
              <Elements stripe={promise}>
                <PaymentPage />
              </Elements>
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div>
              <Header />
              <CheckoutPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
