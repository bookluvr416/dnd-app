import UserAuthForm from "@/components/auth/UserAuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <Link href="/">Return to Home</Link>
      <div>
        <UserAuthForm />
      </div>
    </>
  );
}
