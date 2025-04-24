'use client'

import { useEffect, useState } from 'react';
import type { Session } from 'next-auth';
import Delete from './Delete';

interface Props {
  id: number;
  userId: number | null;
}

const CharacterFooter: React.FC<Props> = ({ id, userId }) => {
  const [session, setSession] = useState<Session | null>(null);

  /**
   * useEffect
   * fetches session details from the server
   */
  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch('/api/session');
      const { session } = await response.json();
      setSession(session)
    }
    fetchSession();
  }, [])

  if (!session || session.user.id !== userId) {
    return (<></>)
  }

  return (
    <section className="flex flex-row justify-between p-5 mt-5 rounded-2xl
                        ring-1 ring-indigo-400 bg-indigo-950"
    >
      <Delete id={id} />
    </section>
  )
}

export default CharacterFooter;
