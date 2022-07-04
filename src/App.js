import { Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";

import Layout from "./components/Layout/Layout";

// import UserProfile from "./components/Profile/UserProfile";
// import AuthPage from "./pages/AuthPage";
// import HomePage from "./pages/HomePage";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const AuthPage = React.lazy(() => import("./pages/AuthPage"));
const UserProfile = React.lazy(() =>
  import("./components/Profile/UserProfile")
);


function App() {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/profile" element={<UserProfile />} />

          <Route path="/auth" element={<AuthPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
