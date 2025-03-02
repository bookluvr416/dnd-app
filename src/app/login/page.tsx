import UserAuthForm from '@/components/auth/UserAuthForm';
import WrapperDiv from '@/components/shared/WrapperDiv';
import HeaderBanner from '@/components/shared/HeaderBanner';

export default function LoginPage() {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <WrapperDiv>
          <HeaderBanner text='Sign In' />
          <p className="p-6">
            Sign in with Github to access features to create, modify, and delete characters.
          </p>
          <div className="p-6">
            <UserAuthForm />
          </div>
        </WrapperDiv>
      </div>
    </main>
  );
}
