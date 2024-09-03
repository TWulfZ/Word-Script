import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import BaseLayout from "./layouts/BaseLayout";
import { syncThemeWithLocal } from "./helpers/theme_helpers";
import { useTranslation } from "react-i18next";
import "./localization/i18n";
import { updateAppLanguage } from "./helpers/language_helpers";
import Header from "@/components/App/Header";
import Main from "@/components/App/Main";
import Footer from "@/components/App/Footer";

export default function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        syncThemeWithLocal();
        updateAppLanguage(i18n);
    }, []);

    return (
        <BaseLayout>
            <div className="h-full min-h-screen w-full space-y-4 px-8">
                <Header />
                <Main />
                <Footer />
            </div>
        </BaseLayout>
    );
}

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
