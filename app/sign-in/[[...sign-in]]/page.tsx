import AuthWrapper from "@/components/AuthWrapper";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return <AuthWrapper>
    <SignIn appearance={{
      elements: {
        card: "shadow-[0_0_30px_1px_#48abe0]"
      }
    }} />
  </AuthWrapper>
}

export default SignInPage;