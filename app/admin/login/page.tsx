import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-pale px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-soft">
        <Image src="/images/logo.png" alt="Ada Balon Bengkulu" width={932} height={664} priority className="mx-auto h-20 w-auto" />
        <h1 className="mt-4 text-center text-2xl font-extrabold text-brand-deep">Panel Admin</h1>
        <p className="mb-6 mt-1 text-center text-sm font-semibold text-brand-dark">Masuk untuk mengelola toko.</p>
        <LoginForm />
      </div>
    </main>
  );
}
