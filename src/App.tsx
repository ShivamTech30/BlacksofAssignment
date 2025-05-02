import React, { Suspense, lazy } from "react";

// Lazy load components for better performance
const Header = lazy(() => import("./Components/Header"));
const ScreenPage = lazy(() => import("./Components/ScreenPage"));
const Animation = lazy(() => import("./Components/Vehicles"));
const GetinTouch = lazy(() => import("./Components/GetinTouch"));
const Footer = lazy(() => import("./Components/Footer"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <ScreenPage />
      <Animation />
      <GetinTouch />
      <Footer />
    </Suspense>
  );
};

export default App;