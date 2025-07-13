# Opening notes

I'm going to create a feature/baseline branch with some initial thoughts and any helpful workflow details. I'll be basing other branches off of feature/baseline for the sake of this exercise.

I'm going to add a flake.nix so I can easily manage my dependencies (so different personal projects, interview assignments, etc can all have cleanly separate deps)


# Creating database

Used:
```
create database solaceassignment encoding UTF8 locale "en_US.utf8";
```

Just so there's no surprises with the encoding and the locale.

For development, set `export DATABASE_URL=postgresql://postgres:password@127.0.0.1:5432/solaceassignment`

# Changelog notes
- db/index.ts will now throw an error if DATABASE_URL is not set. (Having it return a stub of select is kind of an odd thing to do; there are better ways of stubbing out the db if we need to run tests/etc) (Fixes return type of setup() function)