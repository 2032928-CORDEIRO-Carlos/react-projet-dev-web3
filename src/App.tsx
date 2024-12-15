import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { useState } from "react";

// Composants
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SortsPage from "./pages/SortsPage";
import AddSortPage from "./pages/AddSortPage";
import EditSortPage from "./pages/EditSortPage";
import SortDetails from "./components/SortDetails";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./routes/login.route";
import HomeRoute from "./routes/home.route";

// Fichiers de traduction
import messagesFr from "./lang/fr.json";
import messagesEn from "./lang/en.json";
import responsiveConfig from "./context/responsive";

const App = () => {
  const [locale, setLocale] = useState<string>("fr");
  const messages = locale === "fr" ? messagesFr : messagesEn;

  const toggleLanguage = () => {
    setLocale((prevLocale) => (prevLocale === "fr" ? "en" : "fr"));
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Router>
        <Navbar toggleLanguage={toggleLanguage} locale={locale} />
        <main className={`${responsiveConfig.root} pt-16`}>
          <div className={`${responsiveConfig.container} ${responsiveConfig.maxWidth} mx-auto`}>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sorts" element={<SortsPage />} />
              <Route path="/add-sort" element={<AddSortPage />} />
              <Route path="/sorts/:id/edit" element={<EditSortPage />} />
              <Route path="/sorts/:id" element={<SortDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </IntlProvider>
  );
};

export default App;
