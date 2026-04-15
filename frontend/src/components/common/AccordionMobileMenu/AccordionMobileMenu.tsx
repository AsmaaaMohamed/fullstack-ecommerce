import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToggleMenu } from "@/hooks/useToggleMenu";
import { Link } from "react-router-dom";
import useTranslate from "@/hooks/useTranslate";

const AccordionMobileMenu = () => {
  const { t } = useTranslate();
  const { isOpen, onToggle } = useToggleMenu();
  return (
    <Accordion type="single" collapsible className={`py-[10px] accordion`}>
      <AccordionItem value="item-1" className="">
        <Link
          to="/"
          className={`flex items-center font-normal transition duration-0.3 gap-[10px] py-[12px] px-[20px] text-muted`}
          onClick={() => isOpen && onToggle()}
        >
          <span>{t("common.home")}</span>
        </Link>
      </AccordionItem>
      <AccordionItem value="item-2" className="">
        <Link
          to="/about"
          className={`flex items-center font-normal text-muted transition duration-0.3 gap-[10px] py-[12px] px-[20px]`}
          onClick={() => isOpen && onToggle()}
        >
          <span>{t("common.about")}</span>
        </Link>
      </AccordionItem>
      <AccordionItem value="item-3" className="">
        <AccordionTrigger
          className={`justify-start font-normal text-muted gap-[10px] hover:no-underline py-[12px] px-[20px]`}
        >
          {t("common.shop")}
        </AccordionTrigger>
        <AccordionContent>
          <Link
            to="/cart"
            className={`flex items-center font-normal text-muted py-[7px] pr-[10px] pl-[45px] text-base`}
            onClick={() => isOpen && onToggle()}
          >
            <span>{t("common.cart")}</span>
          </Link>
        </AccordionContent>
        <AccordionContent>
          <Link
            to="/track-order"
            className={`flex items-center font-normal text-muted py-[7px] pr-[10px] pl-[45px] text-base`}
            onClick={() => isOpen && onToggle()}
          >
            <span>{t("common.trackOrder")}</span>
          </Link>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6" className="">
        <Link
          to="/contact"
          className={`flex items-center font-normal text-muted transition duration-0.3 gap-[10px] py-[12px] px-[20px]`}
          onClick={() => isOpen && onToggle()}
        >
          <span>{t("common.contact")}</span>
        </Link>
      </AccordionItem>
      <AccordionItem value="item-4" className="">
        <Link
          to="/login"
          className={`flex items-center font-normal text-muted transition duration-0.3 gap-[10px] py-[12px] px-[20px]`}
          onClick={() => isOpen && onToggle()}
        >
          <span>{t("common.login")}</span>
        </Link>
      </AccordionItem>
    </Accordion>
  );
};

export default AccordionMobileMenu;
