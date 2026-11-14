CREATE TYPE "public"."color_group" AS ENUM('petal_pastel', 'petal_chrome', 'stem', 'ribbon');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('baru', 'diproses', 'siap', 'selesai', 'batal');--> statement-breakpoint
CREATE TYPE "public"."palette" AS ENUM('pastel', 'chrome');--> statement-breakpoint
CREATE TYPE "public"."petal_style" AS ENUM('simple', 'curly', 'plain');--> statement-breakpoint
CREATE TYPE "public"."product_theme" AS ENUM('blue', 'pink', 'teal');--> statement-breakpoint
CREATE TYPE "public"."recipe_scope" AS ENUM('stem', 'bouquet');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('masuk', 'keluar');--> statement-breakpoint
CREATE TABLE "colors" (
	"id" text PRIMARY KEY NOT NULL,
	"group" "color_group" NOT NULL,
	"name" text NOT NULL,
	"hex" text NOT NULL,
	"light" boolean DEFAULT false NOT NULL,
	"surcharge" integer DEFAULT 0 NOT NULL,
	"is_ready" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "flower_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"price_per_stem" integer NOT NULL,
	"petal_style" "petal_style" DEFAULT 'simple' NOT NULL,
	"palette" "palette" DEFAULT 'pastel' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "login_attempts" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "materials" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"unit" text NOT NULL,
	"pack_price" integer NOT NULL,
	"pack_qty" double precision NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"description" text NOT NULL,
	"flower_type_id" text,
	"product_id" text,
	"qty" integer NOT NULL,
	"unit_price" integer NOT NULL,
	"unit_cost" integer DEFAULT 0 NOT NULL,
	"extra_cost" integer DEFAULT 0 NOT NULL,
	"petal_color" text,
	"stem_color" text,
	"ribbon_color" text,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"no" serial NOT NULL,
	"customer_name" text NOT NULL,
	"customer_phone" text DEFAULT '' NOT NULL,
	"order_date" date NOT NULL,
	"pickup_date" date,
	"status" "order_status" DEFAULT 'baru' NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"shipping_fee" integer DEFAULT 0 NOT NULL,
	"total" integer NOT NULL,
	"is_paid" boolean DEFAULT false NOT NULL,
	"paid_at" date,
	"note" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"tagline" text DEFAULT '' NOT NULL,
	"price" integer NOT NULL,
	"image" text NOT NULL,
	"theme" "product_theme" DEFAULT 'blue' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"flower_type_id" text,
	"stem_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipe_items" (
	"id" text PRIMARY KEY NOT NULL,
	"scope" "recipe_scope" NOT NULL,
	"flower_type_id" text,
	"material_id" text NOT NULL,
	"qty" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"type" "transaction_type" NOT NULL,
	"category" text NOT NULL,
	"amount" integer NOT NULL,
	"note" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_flower_type_id_flower_types_id_fk" FOREIGN KEY ("flower_type_id") REFERENCES "public"."flower_types"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_flower_type_id_flower_types_id_fk" FOREIGN KEY ("flower_type_id") REFERENCES "public"."flower_types"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_items" ADD CONSTRAINT "recipe_items_flower_type_id_flower_types_id_fk" FOREIGN KEY ("flower_type_id") REFERENCES "public"."flower_types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recipe_items" ADD CONSTRAINT "recipe_items_material_id_materials_id_fk" FOREIGN KEY ("material_id") REFERENCES "public"."materials"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "colors_group_idx" ON "colors" USING btree ("group");--> statement-breakpoint
CREATE INDEX "login_attempts_ip_idx" ON "login_attempts" USING btree ("ip","created_at");--> statement-breakpoint
CREATE INDEX "order_items_order_idx" ON "order_items" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "orders_status_idx" ON "orders" USING btree ("status");--> statement-breakpoint
CREATE INDEX "orders_paid_at_idx" ON "orders" USING btree ("paid_at");--> statement-breakpoint
CREATE INDEX "recipe_items_type_idx" ON "recipe_items" USING btree ("flower_type_id");--> statement-breakpoint
CREATE INDEX "transactions_date_idx" ON "transactions" USING btree ("date");