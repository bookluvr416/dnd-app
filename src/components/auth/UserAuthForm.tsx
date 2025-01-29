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
    >
      Github
    </Button>
  );
};

export default UserAuthForm;
