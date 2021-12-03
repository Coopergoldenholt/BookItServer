INSERT INTO users (first_name, last_name, phone_number, email, password, stripe_id, verified, employee)
VALUES($1, $2, $3, $4, $5, $6, false, false)
returning *;