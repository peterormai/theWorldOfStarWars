--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6


ALTER TABLE IF EXISTS ONLY public.starwars_users DROP CONSTRAINT IF EXISTS pk_starwars_users_id CASCADE;

DROP TABLE IF EXISTS public.starwars_users;
DROP SEQUENCE IF EXISTS public.starwars_users_id_seq;
CREATE TABLE starwars_users (
    id serial NOT NULL,
    username character varying(255) UNIQUE,
    password character varying(255),
    email character varying(255) UNIQUE,
    registration_time timestamp without time zone,
    role character varying(255) DEFAULT 'user',
);


ALTER TABLE ONLY starwars_users
    ADD CONSTRAINT pk_starwars_users_id PRIMARY KEY (id);


INSERT INTO users VALUES (1, 'username', 'password', 'test@testing.co.uk', '2017-06-07 14:01:00');
INSERT INTO users VALUES (2, 'aladar_istvan', 'shorthand', 'aladar@testing.co.uk', '2017-01-07 11:30:00');
INSERT INTO users VALUES (3, 'egyip_Tomi', 'jukasssss', 'nemlyukas@jukasing.co.uk', '2017-06-02 23:59:00');
INSERT INTO users VALUES (4, 'Ormai_Petya', 'dzsasztinbibor', 'peter@jukasing.uk', '2011-01-02 21:29:00');
INSERT INTO users VALUES (5, 'Barney', 'kualalumpur', 'egyiptom@pakisztan.co.uk', '2017-03-23 11:59:00');
INSERT INTO users VALUES (6, 'helike', 'kaliczka', 'helgaszeret@se.nem', '2018-06-02 15:15:00');
INSERT INTO users VALUES (7, 'pudingzsarnok', 'citromsav', 'kalapos@jukasing.co.uk', '2017-06-02 23:59:00');
INSERT INTO users VALUES (8, 'kalapos', 'szeretemjucit', 'julius@cezar.com', '2017-06-08 08:43:00');
INSERT INTO users VALUES (9, 'jancsika', 'nemertem', 'nemertem@jukasing.co.uk', '2017-04-11 19:01:00');
INSERT INTO users VALUES (10, 'azisten', 'envagyokcsaken', 'iamthegod@jukasing.co.uk', '2017-02-26 23:59:00');
SELECT pg_catalog.setval('users_id_seq', 10, true);
