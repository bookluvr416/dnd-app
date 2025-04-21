'use client'

import FadeLoader from 'react-spinners/FadeLoader';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Button from '../shared/Button';
import ErrorAlert from '../shared/ErrorAlert';

const UserAuthForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  /**
   * loginWithGithub
   * sets loading state and signs user in to github
   */
  const loginWithGithub = async () => {
    setIsLoading(true)
    setHasError(false);

    try {
      await signIn('github')
    } catch (error) {
      console.log(error);
      setHasError(true);
      setIsLoading(false);
    }
  }

  return (
    <div className='p-6'>

      {hasError && (
        <div className="mb-10">
          <ErrorAlert>
            An error occured on signing in, please try again.
          </ErrorAlert>
        </div>
      )}

      <p className='mb-5'>Sign in with Github to access features to create, modify, and delete characters.</p>
      {isLoading && (
        <FadeLoader
          color="#fa77f7"
          loading={isLoading}
          aria-label="Loading Spinner"
          data-testid="loader"
          className='mb-5'
        />
      )}

      <Button
        text="Sign in with Github"
        onClick={loginWithGithub}
        type='button'
        disabled={isLoading}
        cssColor='bg-purple-900 hover:bg-purple-900/80'
      />
    </div>
  );
};

export default UserAuthForm;
