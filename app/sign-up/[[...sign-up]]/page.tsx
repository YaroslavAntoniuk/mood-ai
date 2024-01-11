import AuthWrapper from "@/components/AuthWrapper";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return <AuthWrapper>
    <SignUp
      appearance={{
        elements: {
          card: "shadow-[0_0_30px_1px_#48abe0]"
        }
      }}
      afterSignUpUrl="/new-user"
      redirectUrl="/new-user"
    />;
  </AuthWrapper>
}

export default SignUpPage;