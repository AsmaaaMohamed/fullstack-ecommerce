import data from "@/localData.json";
import { selectLanguage } from "@/lib/i18n";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLanguage, TLanguageCode } from "@/store/language/languageSlice";
import { useEffect, useState } from "react";

const languages = data.languages;

const useLanguages =()=>{
    const dispatch = useAppDispatch();
    const [langOpen, setLangOpen] = useState(false);
    const langValue = useAppSelector(selectLanguage);

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.documentElement.lang = langValue;
        }
    }, [langValue]);

    const updateLanguage = (value: string) => {
        dispatch(setLanguage(value as TLanguageCode));
    };

    return{languages , langOpen , setLangOpen ,langValue , setLangValue: updateLanguage};
}
export default useLanguages;
