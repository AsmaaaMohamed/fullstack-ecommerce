import data from "@/localData.json";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrency } from "@/store/currency/currencySlice";
import { selectCurrency } from "@/lib/currency";
import { useState } from "react";

const currencies = data.currencies;

const useCurrencies = ()=>{
    const dispatch = useAppDispatch();
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const currencyValue = useAppSelector(selectCurrency);
    const setCurrencyValue = (value: string) => {
        dispatch(setCurrency(value as "usd" | "euro" | "rubi" | "rubol"));
    };
    return{currencies , currencyOpen , setCurrencyOpen , currencyValue ,setCurrencyValue};
};
export default useCurrencies;
