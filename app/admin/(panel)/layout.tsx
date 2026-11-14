import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth/dal";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-sky-pale md:flex">
      <AdminNav />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-6 sm:px-6 md:pb-10 md:pt-8">{children}</main>
    </div>
  );
}
