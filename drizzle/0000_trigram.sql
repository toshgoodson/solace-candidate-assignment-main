-- Custom SQL migration file, put your code below! --

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX advocates_first_name_trgm_idx ON advocates USING GIN (first_name gin_trgm_ops);
CREATE INDEX advocates_last_name_trgm_idx ON advocates USING GIN (last_name gin_trgm_ops);
CREATE INDEX advocates_city_trgm_idx ON advocates USING GIN (city gin_trgm_ops);
CREATE INDEX advocates_degree_trgm_idx ON advocates USING GIN (degree gin_trgm_ops);
CREATE INDEX advocates_specialties_trgm_idx ON advocates USING GIN (specialties gin_trgm_ops);
CREATE INDEX advocates_years_of_experience_trgm_idx ON advocates USING GIN (years_of_experience gin_trgm_ops);