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
(I can already see some obvious issues with the main page (especially the `innerHTML` usage); but instead of tackling those directly, I'll work through them as I update the UI to something a little bit more polished)
(I also see that I'm going to need to add some pagination since the advocates GET just returns everything)
- Add typing for advocate schema
- Slightly nicer UI for table and search
- Use controlled input for search field
- Paginated API results with indexed text search

# What I would do with more time
- Refactor phone number to be a string rather than a big int
- Cache pagination count for searches
- Add loading indicator for initial page load and searches
- Add pagination logic to handle showing a subset of page choices if total page count is high
- Refactor to break major page parts into separate components. e.g. Search, AdvocatesTable, Pagination
- Refactor specialties to be a separate table