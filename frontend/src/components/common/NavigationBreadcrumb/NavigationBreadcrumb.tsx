import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import useTranslate from "@/hooks/useTranslate";

type TNavigationBreadcrumb = {
  pageTitle: string;
  parentTitle?: string;
  parentSlug?: string;
};
const NavigationBreadcrumb = ({
  pageTitle,
  parentTitle,
  parentSlug,
}: TNavigationBreadcrumb) => {
  const { t } = useTranslate();
  return (
    <div className="rts-navigation-area-breadcrumb">
      <div className="container">
        <div className="flex">
          <div className="lg:w-full w-full">
            <Breadcrumb className="flex items-center gap-[25px] py-[20px]">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-base hover:text-primary"
                  >
                    {t("common.home")}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {parentTitle && (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink
                        href={`${parentSlug}`}
                        className="text-base hover:text-primary"
                      >
                        {parentTitle}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-base font-medium text-secondary">
                    {pageTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
};

export default NavigationBreadcrumb;
