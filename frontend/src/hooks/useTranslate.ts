import i18n, { selectLanguage } from "@/lib/i18n";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const useTranslate = () => {
  const language = useAppSelector(selectLanguage);
  const { t } = useTranslation();

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  return {
    language,
    t,
  };
};

export default useTranslate;
