import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import useTranslate from "@/hooks/useTranslate";

const TopHeader = () => {
  const { t } = useTranslate();
  return (
    <div className={`hidden md-992:block bg-[var(--color-primary)] py-[10px]`}>
        <div className="container">
          <div className="flex ">
            <div className="lg:w-full w-full">
              <div
                className={`flex items-center justify-between`}
              >
                <div className={`flex items-center gap-[15px]`}>
                  <p className={`mb-0 font-normal text-white text-sm lg-1100:text-base`}>
                    {t("header.topBanner")}
                  </p>
                  <div className="">
                    <CountDown targetDate="2027-2-31" bg="none"/>
                  </div>
                </div>
                <div className="contact-number-area">
                  <p className="mb-0 font-normal text-white text-sm lg-1100:text-base">
                    {t("header.needHelp")}
                    <Link to="tel:+4733378901">+258 3268 21485</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TopHeader;
