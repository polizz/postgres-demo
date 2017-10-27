# PostgresQL loader demo

## Docker setup
1. ```docker network create --driver bridge postgres_network```
2. ```docker volume create pgdata```
3. ```docker run --network postgres_network --name postgres_admin -d -p 5050:5050 -e SERVER_MODE=false chorss/docker-pgadmin4```
4. ```docker run --mount source=pgdata,dst=/pgdata/data --name postgres --network postgres_network -p 5432:5432 -e POSTGRES_PASSWORD=password -e PGDATA=/pgdata/data -d postgres```

PgAdmin will run on exposed locahost http://localhost:5050

You can connect to the *postgres* host with the hostname **postgres** and default port of **5432**.

The password for the default **postgres** user will be **password**.

## Sample SQL Queries
```sql
select doc from direwolf.cfr where doc -> 'SiteTags' <> '"N/A"' AND doc -> 'SiteTags' <> '"NA"'
```
```sql
select doc -> 'SiteGeneral' from direwolf.cfr where doc -> 'SiteTags' <> '"N/A"' AND doc -> 'SiteTags' <> '"NA"'
```