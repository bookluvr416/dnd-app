import UserAuthForm from '@/components/auth/UserAuthForm';
import WrapperDiv from '@/components/shared/WrapperDiv';
import HeaderBanner from '@/components/shared/HeaderBanner';

export default function LoginPage() {
  return (
    <main>
      <div className="mr-4 ml-4 min-w-screen pt-6 pb-20 sm:px-6">
        <WrapperDiv>
          <HeaderBanner text='Sign In' />
            <UserAuthForm />
        </WrapperDiv>
      </div>
    </main>
  );
}
