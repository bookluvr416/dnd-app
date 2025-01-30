import UserAuthForm from "@/components/auth/UserAuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="p-28 pt-12">
      <h1 className="text-2xl p-6">Sign In</h1>
      <p className="p-6">
        Sign in with Github to access features to create, modify, and delete characters.
      </p>
      <div className="p-6">
        <UserAuthForm />
      </div>
    </main>
  );
}
