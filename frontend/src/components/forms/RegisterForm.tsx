import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Link, Navigate } from "react-router-dom";
import useRegister from "@/hooks/useRegister";
import Cookies from "js-cookie";
import useTranslate from "@/hooks/useTranslate";

const RegisterForm = () => {
  const { t } = useTranslate();
  const {error,loading,form,onSubmit ,emailAvailabilityStatus , emailOnBlurHandler} = useRegister();
  const emailAvailabilityError = emailAvailabilityStatus === "notAvailable" ? t("forms.emailInUse") :  emailAvailabilityStatus === "failed" ? t("forms.emailCheckFailed") : null;
  const emailAvailabilitySuccess = emailAvailabilityStatus === "available" ? t("forms.emailAvailable"): null;
  const emailAvailabilityChecking = emailAvailabilityStatus === "checking" ? t("forms.checkingEmail"): null;

  const accessToken = Cookies.get('accessToken');
  if (accessToken)
    return <Navigate to='/account' />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="inline-block mb-[4px] font-medium text-secondary text-base">{t("forms.username")}</FormLabel>
              <FormControl>
                <Input required {...field} className="p-[15px] h-auto"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="inline-block mb-[4px] font-medium text-secondary text-base">{t("forms.email")}</FormLabel>
              <FormControl>
                <Input
                  required
                  {...field}
                  className="p-[15px] h-auto"
                  onBlur={emailOnBlurHandler}
                  disabled = {emailAvailabilityStatus === 'checking'? true : false}
                />
              </FormControl>
              <FormMessage className="text-red-600"/>
              {(emailAvailabilityError && !form.formState.errors.email) && <FormMessage className="text-red-600">{emailAvailabilityError}</FormMessage> }
              {(emailAvailabilitySuccess && !form.formState.errors.email) && <FormMessage className="text-primary">{emailAvailabilitySuccess}</FormMessage>}
              {(emailAvailabilityChecking && !form.formState.errors.email) && <FormMessage className="text-muted">{emailAvailabilityChecking}</FormMessage>}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="inline-block mb-[4px] font-medium text-secondary text-base">{t("forms.password")}</FormLabel>
              <FormControl>
                <Input type="password" required {...field} className="p-[15px] h-auto" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="py-[14px] px-[25px] text-base font-bold h-auto max-w-full w-full"
          disabled={
            emailAvailabilityStatus === "checking" || loading === "pending"
          }
        >
         {loading ==="pending"? <><LoadingSpinner/> {t("forms.registering")}</> : t("forms.registerAccount")}
        </Button>
        {error && <p className="text-red-600 mt-[10px]">{error}</p>}
        <div className="another-way-to-registration">
          <div className="registradion-top-text flex items-center justify-center my-[30px] relative before:absolute before:content-[''] before:right-0 md:before:w-[35%] before:h-px before:bg-[#E7E7E7] after:absolute after:content-[''] after:left-0 md:after:w-[35%] after:h-px after:bg-[#E7E7E7] before:w-[20%] after:w-[20%]">
            <span className="font-medium text-secondary">{t("forms.orRegisterWith")}</span>
          </div>
          {/* <div className="login-with-brand flex items-center gap-[10px]">
            <LoginSocialFacebook
            appId="1694770794638371"
            onResolve={(response) => {
              // console.log(response);
              
            }}
            onReject={(error) => {
              // console.log(error);
            }}
            >
              <Button href="#" className="single flex basis-[49%] justify-center h-[50px] rounded-[6px] border border-solid border-[#EBEBEB]">
                <img src="src/assets/svg/facebook.svg" alt="login" className="w-[76px]" />
              </Button>
            </LoginSocialFacebook>
            <a href="#" className="single flex basis-[49%] justify-center h-[50px] rounded-[6px] border border-solid border-[#EBEBEB]">
                <img src="src/assets/svg/google.svg" alt="login" className="w-[76px]"/>
            </a>
            
          </div> */}
          {/* <div className="login-with-brand flex items-center gap-[10px]">
            <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`} className="single flex basis-[49%] justify-center h-[50px] rounded-[6px] border border-solid border-[#EBEBEB]">
              <img src="google.svg" alt="login" className="w-[76px]"/>
            </a>
            <a href={`${import.meta.env.VITE_BACKEND_URL}/api/auth/facebook`} className="single flex basis-[49%] justify-center h-[50px] rounded-[6px] border border-solid border-[#EBEBEB]">
              <img src="facebook.svg" alt="login" className="w-[76px]" />
            </a>
          </div> */}
          <p className="m-0 flex justify-center mt-[30px] text-base">
            {t("forms.alreadyHaveAccount")} <Link to="/login" className="text-secondary font-semibold ml-[10px]">{t("common.login")}</Link>
          </p>
        </div>
        
      </form>
    </Form>
  );
};

export default RegisterForm;
