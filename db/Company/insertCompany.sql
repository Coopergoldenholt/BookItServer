INSERT INTO company (name, address_id, description, stripe_id, admin_id)
VALUES($1, $2, $3, $4, $5)
returning *;