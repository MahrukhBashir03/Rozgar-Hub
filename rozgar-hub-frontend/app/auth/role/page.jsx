import Link from "next/link";

export default function RolePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Choose Your Role</h1>

      <Link
        href="/auth/register/worker"
        className="px-8 py-4 bg-blue-600 text-white rounded-lg"
      >
        I am a Worker
      </Link>

      <Link
        href="/auth/register/employer"
        className="px-8 py-4 bg-green-600 text-white rounded-lg"
      >
        I am an Employer
      </Link>
    </div>
  );
}