import { useAppSelector } from "@/store/hooks";
import { loginSchema, loginType } from "@/validations/loginSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useToast } from "./use-toast";
import { useAuthLoginMutation } from "@/store/auth/api/authApiSlice";
import Cookies from "js-cookie";

const useLogin = ()=>{
    const [searchParams, setSearchParams] = useSearchParams();
    const {toast} = useToast();
    const{ user:userInfo} = useAppSelector((state)=>state.auth)
    const[authLogin, { error , isLoading}] = useAuthLoginMutation();
    let user = {}as{id:string,email:string,username:string};
    const navigate = useNavigate();
    const form = useForm<loginType>({
        mode:"onBlur",
        resolver: zodResolver(loginSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    });
    const onSubmit:SubmitHandler<loginType> = async(values) => {
        // Do something with the form values.
        const { email , password} = values;
        try{
            const response = await authLogin({ email , password}).unwrap();
            user = {
            id: response?.data.user._id,
            email: response?.data.user.email,
            username: response?.data.user.name,
            } ;
            // console.log(response)
            const accessToken = response?.token;
            // console.log("Access Token in useLogin:", accessToken);
            if(accessToken)
                Cookies.set('accessToken', accessToken);

            if(user.username)
                Cookies.set('username', user.username);
            // console.log("Login successful:", response);
            navigate("/account");
        }
        catch(error:any){
            toast({
                variant:"destructive",
                description: error?.data?.message || "Login failed. Please try again.",
            });
        }
    }
    useEffect(()=>{
        if(searchParams.get("message") === "account_created")
        {
            setSearchParams("");
            toast({
                variant:"default",
                description: "Your account successfully created, you can login now",
            });
        }
        else if(searchParams.get("message") === "login_required"){
            setSearchParams("");
            toast({
                variant:"destructive",
                description: "You need to login to view this content",
            });
        }
        else if(searchParams.get("message") === "login_failed"){
            setSearchParams("");
            toast({
                variant:"destructive",
                description: "Sorry login failed. Please check your credentials and try again.",
            });
        }
        else if(searchParams.get("message") === "email_in_use"){
            setSearchParams("");
            toast({
                variant:"destructive",
                description: "This email is already in use. Please use a different email.",
            });
        }
    },[toast , searchParams , setSearchParams]);
    return {
        error,
        isLoading,
        user:userInfo,
        form,
        onSubmit
    };
}
export default useLogin;
