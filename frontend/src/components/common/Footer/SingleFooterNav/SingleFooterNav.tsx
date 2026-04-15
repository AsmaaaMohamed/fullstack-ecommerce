import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import useTranslate from "@/hooks/useTranslate";

const SingleFooterNav = () => {
  const { t } = useTranslate();
  return (
    <div className={`singleFooterWized`}>
        <h3 className={`animated fadeIn footerTitle text-[20px] font-bold`}>{t("footer.ourStores")}</h3>
        <div className={`footerNav`}>
            <NavigationMenu>
                <NavigationMenuList className="block m-0">
                    <NavigationMenuItem className="!ml-0 !my-[10px] first:!mt-0">
                        <NavigationMenuLink href="/" className="text-base text-[#74787C] transition duration-0.3 hover:text-primary">{t("footer.deliveryInformation")}</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="!ml-0 !my-[10px]">
                        <NavigationMenuLink href="/" className="text-base text-[#74787C] transition duration-0.3 hover:text-primary">{t("footer.privacyPolicy")}</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="!ml-0 !my-[10px]">
                        <NavigationMenuLink href="/" className="text-base text-[#74787C] transition duration-0.3 hover:text-primary">{t("footer.termsConditions")}</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="!ml-0 !my-[10px]">
                        <NavigationMenuLink href="/" className="text-base text-[#74787C] transition duration-0.3 hover:text-primary">{t("footer.supportCenter")}</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="!ml-0 !my-[10px]">
                        <NavigationMenuLink href="/" className="text-base text-[#74787C] transition duration-0.3 hover:text-primary">{t("footer.careers")}</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </div>
  );
};

export default SingleFooterNav;
