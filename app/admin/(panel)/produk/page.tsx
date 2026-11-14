import { asc } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { PageHeader, Tabs } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth/dal";
import CatalogTab from "./CatalogTab";
import ColorsTab from "./ColorsTab";
import FlowerTypesTab from "./FlowerTypesTab";
import SettingsTab from "./SettingsTab";

export const metadata = { title: "Produk" };

const TABS = [
  { id: "jenis", label: "Jenis bunga" },
  { id: "warna", label: "Warna" },
  { id: "katalog", label: "Katalog" },
  { id: "pengaturan", label: "Pengaturan" },
];

export default async function ProdukPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  await requireAdmin();
  const { tab } = await searchParams;
  const current = TABS.some((t) => t.id === tab) ? tab! : "jenis";

  const db = getDb();
  const { flowerTypes, colors, products, settings } = schema;
  const [typeRows, colorRows, productRows, settingRows] = await Promise.all([
    db.select().from(flowerTypes).orderBy(asc(flowerTypes.sortOrder), asc(flowerTypes.createdAt)),
    db.select().from(colors).orderBy(asc(colors.sortOrder), asc(colors.createdAt)),
    db.select().from(products).orderBy(asc(products.sortOrder), asc(products.createdAt)),
    db.select().from(settings),
  ]);

  return (
    <>
      <PageHeader title="Produk" description="Perubahan di sini langsung tampil di halaman toko." />
      <Tabs tabs={TABS} current={current} basePath="/admin/produk" />
      {current === "jenis" && <FlowerTypesTab types={typeRows} />}
      {current === "warna" && <ColorsTab colors={colorRows} />}
      {current === "katalog" && <CatalogTab products={productRows} types={typeRows} />}
      {current === "pengaturan" && <SettingsTab settings={settingRows} />}
    </>
  );
}
