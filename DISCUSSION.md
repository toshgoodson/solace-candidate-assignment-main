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

