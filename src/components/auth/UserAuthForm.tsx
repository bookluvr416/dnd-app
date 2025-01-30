'use client'

import { Button } from '@headlessui/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

const UserAuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      console.log(error);
      window.alert('There was an error signing in.');
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={loginWithGithub}
      type='button'
      className="p-6 rounded text-purple-100 bg-violet-900 hover:bg-violet-700 hover:text-violet-100"
    >
      Sign in with Github
    </Button>
  );
};

export default UserAuthForm;
