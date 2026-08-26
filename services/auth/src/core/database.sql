



 -- table 1
 
 CREATE TABLE IF NOT EXISTS user_credentials1(
 id UUID NOT NULL PRIMARY KEY
 ,email VARCHAR(200) NOT NULL UNIQUE,
 password_hash TEXT NOT NULL,
 display_name VARCHAR(20) NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT now(),
 updated_at TIMESTAMP NOT NULL DEFAULT now());
 -- table 2

 CREATE TABLE IF NOT EXISTS refresh_tokens (
   id UUID NOT NULL PRIMARY KEY,
   user_id UUID NOT NULL REFERENCES user_credentials1(id),
   token_id UUID NOT NULL,
   expires_at TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '7 days',
   created_at TIMESTAMP DEFAULT now(),
   updated_at TIMESTAMP DEFAULT now()
 );
