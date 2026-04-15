import CounterBox from "./CounterBox";
import useTranslate from "@/hooks/useTranslate";

function HeroAbout() {
  const { t } = useTranslate();
  const counter = [
    {
      target: 60,
      desc: t("pages.happyCustomers"),
    },
    {
      target: 105,
      desc: t("pages.groceryProducts"),
    },
    {
      target: 80,
      desc: t("pages.activeSalesman"),
    },
    {
      target: 60,
      desc: t("pages.storeWorldwide"),
    },
  ];
  const renderedCounters = counter.map((el, idx)=>{
    return <CounterBox key={idx} target={el.target} desc={el.desc} />;
  }) 
  return (
    <>
      <div className="about-banner-area-bg rts-section-gap bg-aboutSection h-[582px] flex items-center py-[60px] bg-no-repeat bg-cover">
        <div className="container">
          <div className="flex">
            <div className="lg:w-full w-full">
              <div className="inner-content-about-area md:max-w-[60%] max-w-full text-center m-auto -mt-[50px]">
                <h1 className="title text-white text-[36px] md:text-[48px] leading-[1.3] font-semibold">
                  {t("pages.aboutHeroTitle")}
                </h1>
                <p className="disc text-base text-white max-w-[85%] m-auto leading-[28px] md:leading-[1.3]">
                  {t("pages.aboutHeroDescription")}
                </p>
                <a
                  href="#"
                  className="rts-btn btn-primary bg-primary rounded-[6px] block max-w-max mt-[40px] m-auto py-[14px] px-[25px] text-base font-bold text-white"
                >
                  {t("pages.contactUs")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rts-counter-area">
        <div className="container !max-w-[1320px]">
          <div className="flex">
            <div className="lg:w-full w-full">
              <div className="counter-area-main-wrapper md:py-[60px] md:px-[100px] p-[25px] rounded-[6px] border border-solid border-[#E2E2E2] -mt-[80px] bg-white shadow-[0px_20px_39px_rgba(0, 0, 0, 0.05)] flex flex-wrap items-center gap-[50px] lg-1200:justify-between justify-center">
                {renderedCounters}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroAbout
