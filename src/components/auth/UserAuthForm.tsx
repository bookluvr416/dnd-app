'use client'

import FadeLoader from 'react-spinners/FadeLoader';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Button from '../shared/Button';

const UserAuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * loginWithGithub
   * sets loading state and signs user in to github
   */
  const loginWithGithub = async () => {
    setIsLoading(true)

    try {
      await signIn('github')
    } catch (error) {
      console.log(error);
      window.alert('There was an error signing in.');
    }
  }

  return (
    <>
      {isLoading && (
        <FadeLoader
          color="#fa77f7"
          loading={isLoading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {!isLoading && (
        <Button
          text="Sign in with Github"
          onClick={loginWithGithub}
          type='button'
        />
      )}
    </>
  );
};

export default UserAuthForm;
