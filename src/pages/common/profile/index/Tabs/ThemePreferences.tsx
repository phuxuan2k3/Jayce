import React from "react";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useLanguage } from "../../../../../LanguageProvider";

const ThemePreferences = () => {
    const { t } = useLanguage();
    const [activeTheme, setActiveTheme] = React.useState<'light' | 'dark'>('light');

    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">{t("settings_theme_mode_title")}</h2>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div
                        onClick={() => setActiveTheme('light')}
                        className={`select-none flex-1 cursor-pointer rounded-lg border ${activeTheme === 'light' ? 'border-blue-400' : 'border-gray-300'} transition hover:shadow-md`}
                    >
                        <div className={`w-full rounded-t-lg flex items-center justify-between mb-2 p-4 ${activeTheme === 'light' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                            <div className="flex items-center gap-2 font-semibold py-0.5">
                                <LightModeOutlinedIcon className="h-6 w-6" />
                                <span>{t("settings_theme_light_label")}</span>
                            </div>
                            {activeTheme === 'light' && (
                                <span className="text-sm text-blue-600 font-bold border border-blue-600 px-2 py-0.5 rounded-full">{t("settings_theme_active")}</span>
                            )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 pr-4 pl-4">
                            {t("settings_theme_light_description")}
                        </p>

                        <div className="flex flex-col rounded-lg flex justify-center m-4 border">
                            <img
                                src="/svg/light_mode.svg"
                                alt="Light Theme Preview"
                                className="w-full h-32 object-cover rounded-t-md"
                            />

                            <p className="font-bold rounded-b-md text-gray-700 p-2 border-t">{t("settings_theme_light_preview")}</p>
                        </div>
                    </div>

                    <div
                        onClick={() => setActiveTheme('dark')}
                        className={`select-none flex-1 cursor-pointer rounded-lg border ${activeTheme === 'dark' ? 'border-blue-400' : 'border-gray-300'} transition hover:shadow-md`}
                    >
                        <div className={`w-full rounded-t-lg flex items-center justify-between mb-2 p-4 ${activeTheme === 'dark' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                            <div className="flex items-center gap-2 font-semibold py-0.5">
                                <DarkModeOutlinedIcon className="h-6 w-6" />
                                <span>{t("settings_theme_dark_label")}</span>
                            </div>
                            {activeTheme === 'dark' && (
                                <span className="text-sm text-blue-600 font-bold border border-blue-600 px-2 py-0.5 rounded-full">{t("settings_theme_active")}</span>
                            )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 pr-4 pl-4">
                            {t("settings_theme_dark_description")}
                        </p>

                        <div className="flex flex-col rounded-lg flex justify-center m-4 border">
                            <img
                                src="/svg/dark_mode.svg"
                                alt="Dark Theme Preview"
                                className="w-full h-32 object-cover rounded-t-md"
                            />

                            <p className="font-bold rounded-b-md text-gray-700 p-2 border-t">{t("settings_theme_dark_preview")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThemePreferences;