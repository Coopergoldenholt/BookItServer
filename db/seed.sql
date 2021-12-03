CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "first_name" varchar(200)  NOT NULL,
  "last_name" varchar(200)  NOT NULL,
  "phone_number" varchar(20) UNIQUE  NOT NULL,
  "email" varchar(200) UNIQUE  NOT NULL,
  "password" text,
  "created_at" timestamp,
  "address_id" int,
  "stripe_id" text  NOT NULL,
  "qr_code" text,
  "verified" boolean,
  "employee" boolean
);

CREATE TABLE "token" (
  "token_id" SERIAL PRIMARY KEY,
  "token" text,
  "user_id" int,
  "created_at" timestamp
);

CREATE TABLE "company" (
  "company_id" SERIAL PRIMARY KEY,
  "name" varchar(500) NOT NULL,
  "address_id" int,
  "description" varchar(1001),
  "stripe_id" text,
  "admin_id" int NOT NULL
);

CREATE TABLE "employee" (
  "employee_id" int PRIMARY KEY,
  "user_id" int NOT NULL,
  "company_id" int NOT NULL
);

CREATE TABLE "customer" (
  "customer_id" int PRIMARY KEY,
  "user_id" int NOT NULL,
  "stripe_id" text NOT NULL,
  "company_id" int NOT NULL
);

CREATE TABLE "location" (
  "location_id" int PRIMARY KEY,
  "name" varchar(500),
  "address_id" int NOT NULL,
  "phone_number" varchar(50),
  "description" varchar(1000),
  "company_id" int NOT NULL,
  "monthly_bookings_allowed" int,
  "bookings_allowed_at_one_time" int
);

CREATE TABLE "slot" (
  "slot_id" int PRIMARY KEY,
  "location_id" int NOT NULL,
  "employee_id" int,
  "name" varchar(1000),
  "traveling" boolean,
  "start_time" timestamp,
  "end_time" timestamp
);

CREATE TABLE "booking" (
  "booking_id" SERIAL PRIMARY KEY,
  "customer_id" int,
  "title" varchar,
  "notes" varchar(1000),
  "slot_id" int,
  "address" int NOT NULL
);

CREATE TABLE "address" (
  "address_id" int PRIMARY KEY,
  "street" varchar(1000),
  "postal_code" varchar(100),
  "city" varchar(1000),
  "province" varchar(1000),
  "country" varchar(1000)
);

ALTER TABLE "users" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("address_id");

ALTER TABLE "token" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "company" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("address_id");

ALTER TABLE "company" ADD FOREIGN KEY ("admin_id") REFERENCES "users" ("user_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "employee" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");

ALTER TABLE "customer" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "customer" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");

ALTER TABLE "location" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("company_id");

ALTER TABLE "location" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("address_id");

ALTER TABLE "slot" ADD FOREIGN KEY ("location_id") REFERENCES "location" ("location_id");

ALTER TABLE "slot" ADD FOREIGN KEY ("employee_id") REFERENCES "employee" ("employee_id");

ALTER TABLE "booking" ADD FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id");

ALTER TABLE "booking" ADD FOREIGN KEY ("slot_id") REFERENCES "slot" ("slot_id");

ALTER TABLE "booking" ADD FOREIGN KEY ("address") REFERENCES "address" ("address_id");