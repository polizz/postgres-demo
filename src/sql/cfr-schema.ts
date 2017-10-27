import { ClientConfig } from "pg";

export const cfrCliConfig: ClientConfig = {
  database: process.env.CFR_PGDATABASE,
}

export const schemaDdl = `CREATE SCHEMA direwolf;
  CREATE TABLE direwolf.cfr (
    site_id uuid,
    parentsite_id uuid DEFAULT '{00000000-0000-0000-0000-000000000000}',
    site_type varchar(25),
    site_status varchar(25),
    doc jsonb
  );`

export const dropDbDdl = 'DROP DATABASE IF EXISTS cfr;'
export const createDbDdl = 'CREATE DATABASE cfr;'

export const createItemDml = `INSERT INTO direwolf.cfr
  (site_id, parentsite_id, site_type, site_status, doc)
  VALUES ($1, $2, $3, $4, $5)`