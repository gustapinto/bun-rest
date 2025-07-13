CREATE TABLE IF NOT EXISTS "page_visit" (
    "id" UUID PRIMARY KEY,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    "user_id" UUID NOT NULL,
    "origin" VARCHAR(500),
    "page" VARCHAR(255) NOT NULL
);
