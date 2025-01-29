'use client'

import { Button } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

const SignOutButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const signUserOut = async () => {
    try {
      setIsLoading(true)
      await signOut()
    } catch (error) {
      console.log(error);
      window.alert('Sign out error');
    }
  }

  return (
    <Button onClick={signUserOut} disabled={isLoading}>Sign Out</Button>
  );
}

export default SignOutButton;
