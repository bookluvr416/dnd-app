import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Delete from './Delete';

interface Props {
  id: number;
}

const CharacterFooter: React.FC<Props> = async ({ id }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
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
