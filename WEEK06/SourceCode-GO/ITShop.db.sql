BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "owners" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"first_name"	text,
	"last_name"	text,
	"admin_role"	text,
	"email"	text,
	"password"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"category_name"	text,
	"owner_id"	integer,
	CONSTRAINT "fk_owners_categories" FOREIGN KEY("owner_id") REFERENCES "owners"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "brands" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"brand_name"	text,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	text,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"product_name"	text,
	"description"	text,
	"price_per_price"	real,
	"stock"	integer,
	"category_id"	integer,
	"brand_id"	integer,
	CONSTRAINT "fk_brands_products" FOREIGN KEY("brand_id") REFERENCES "brands"("id"),
	CONSTRAINT "fk_categories_products" FOREIGN KEY("category_id") REFERENCES "categories"("id"),
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "pictures" (
	"id"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"deleted_at"	datetime,
	"file"	blob,
	"product_id"	text,
	CONSTRAINT "fk_products_pictures" FOREIGN KEY("product_id") REFERENCES "products"("id"),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE INDEX IF NOT EXISTS "idx_owners_deleted_at" ON "owners" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_categories_deleted_at" ON "categories" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_brands_deleted_at" ON "brands" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_products_deleted_at" ON "products" (
	"deleted_at"
);
CREATE INDEX IF NOT EXISTS "idx_pictures_deleted_at" ON "pictures" (
	"deleted_at"
);
COMMIT;
