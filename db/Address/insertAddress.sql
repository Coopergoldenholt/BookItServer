INSERT INTO address (street, postal_code, city, province, country)
VALUES($1, $2, $3, $4, $5)
returning *;