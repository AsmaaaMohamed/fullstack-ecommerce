
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import useCurrencies from "@/hooks/useCurrencies";
import useLanguages from "@/hooks/useLanguages";
import useTranslate from "@/hooks/useTranslate";
import PopoverBtn from "../../PopoverBtn/PopoverBtn";
import { Link } from "react-router-dom";

const MidHeader = () => {
    const{languages , langOpen , setLangOpen ,langValue , setLangValue} = useLanguages();
    const{currencies , currencyOpen , setCurrencyOpen , currencyValue ,setCurrencyValue} = useCurrencies();
    const { t } = useTranslate();
    const selectedLanguageLabel =
      languages.find((language) => language.value === langValue)?.label ?? langValue;
    const selectedCurrencyLabel =
      currencies.find((currency) => currency.value === currencyValue)?.label ?? currencyValue;
  return (
    <div className={`hidden md-992:block`}>
      <div className="container">
        <div className="flex">
          <div className="lg:w-full w-full">
            <div className={`flex items-center justify-between`}>
              <div className={`flex items-center gap-[40px]`}>
                <NavigationMenu>
                  <NavigationMenuList
                    className={`gap-[15px] after:content-[''] after:absolute after:h-full after:w-px after:bg-[#E2E2E2] after:top-0 after:right-[-20px]`}
                  >
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/"
                        className="block font-medium text-sm py-[15px] text-destructive"
                        asChild
                      >
                        <Link to="/">{t("header.aboutUs")}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="block font-medium text-sm py-[15px] text-destructive"
                        asChild
                      >
                        <Link to="/account">{t("header.myAccount")}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        className="block font-medium text-sm py-[15px] text-destructive"
                        asChild
                      >
                        <Link to="/wishlist">{t("header.wishlist")}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <p className="para mb-0">
                  {t("header.deliveryMessage")}
                </p>
              </div>
              <div className={`flex gap-[40px]`}>
                <ul
                  className={`relative p-0 m-0 flex items-center list-none gap-[15px] text-secondary`}
                >
                  <li className="">
                    <PopoverBtn
                      key={`language-${langValue}`}
                      value={langValue}
                      setValue={setLangValue}
                      open={langOpen}
                      setOpen={setLangOpen}
                      arrayOfData={languages}
                      buttonLabel={selectedLanguageLabel}
                    />
                  </li>
                  <li className="">
                    <PopoverBtn
                      key={`currency-${currencyValue}`}
                      value={currencyValue}
                      setValue={setCurrencyValue}
                      open={currencyOpen}
                      setOpen={setCurrencyOpen}
                      arrayOfData={currencies}
                      buttonLabel={selectedCurrencyLabel}
                    />
                  </li>
                  <li>
                    <Link
                      to="/track-order"
                      className="font-medium py-[15px] text-destructive"
                    >
                      {t("common.trackOrder")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MidHeader
