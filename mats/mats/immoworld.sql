--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    city_id integer NOT NULL,
    name text,
    country text
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- Name: city_cit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.city_cit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_cit_id_seq OWNER TO postgres;

--
-- Name: city_cit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.city_cit_id_seq OWNED BY public.cities.city_id;


--
-- Name: estates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estates (
    id integer NOT NULL,
    title text NOT NULL,
    image text,
    postcode text NOT NULL,
    bedrooms integer,
    bathrooms integer,
    city_id integer,
    staff_id integer,
    preis integer
);


ALTER TABLE public.estates OWNER TO postgres;

--
-- Name: staff; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff (
    staff_id integer NOT NULL,
    name text,
    image text,
    phone text,
    office text
);


ALTER TABLE public.staff OWNER TO postgres;

--
-- Name: staff_staff_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.staff_staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.staff_staff_id_seq OWNER TO postgres;

--
-- Name: staff_staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.staff_staff_id_seq OWNED BY public.staff.staff_id;


--
-- Name: cities city_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities ALTER COLUMN city_id SET DEFAULT nextval('public.city_cit_id_seq'::regclass);


--
-- Name: staff staff_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff ALTER COLUMN staff_id SET DEFAULT nextval('public.staff_staff_id_seq'::regclass);


--
-- Data for Name: cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cities VALUES (1, 'London', 'United Kingdom');
INSERT INTO public.cities VALUES (2, 'Vienna', 'Austria');


--
-- Data for Name: estates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.estates VALUES (1, 'Hanover Terrace', 'images/1.jpg', 'NW1 4RJ', 6, 8, 1, 2, 38889634);
INSERT INTO public.estates VALUES (7, 'Courtenay Avenue, London', 'images/59.jpg', 'N6 4LP', 7, 7, 1, 1, 14080730);
INSERT INTO public.estates VALUES (8, 'The Hertzfeld Palais', 'images/69.jpg', '1010', 4, 5, 2, 3, 17919531);
INSERT INTO public.estates VALUES (5, 'Half Moon Street, Mayfair', 'images/40.jpg', 'W1J 7BD', 5, 6, 1, 1, 20115328);
INSERT INTO public.estates VALUES (2, 'Victory House', 'images/9.jpg', 'W8 45RF', 5, 6, 1, 4, 30172992);
INSERT INTO public.estates VALUES (3, 'Hamilton Terrace, St. Johns Wood', 'images/19.jpg', 'NW8 9UJ', 4, 10, 1, 2, 23467993);
INSERT INTO public.estates VALUES (4, 'Huxley House, Bishops Avenue', 'images/29.jpg', 'N2 OBJ', 8, 9, 1, 2, 22797372);
INSERT INTO public.estates VALUES (9, 'In the Heart of Grinzing', 'images/79.jpg', '1190', 4, 3, 2, 3, 2873887);
INSERT INTO public.estates VALUES (6, '101-103 Eaton Place', 'images/49.jpg', 'SW1X 8NJ', 4, 5, 1, 1, 19780072);
INSERT INTO public.estates VALUES (10, 'Blomfield Road', 'images/89.jpg', 'W9 2PF', 3, 2, 1, 2, 4358321);


--
-- Data for Name: staff; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.staff VALUES (1, 'Guy Bradshaw', 'images/staff/guybradshaw.jpg', '+44(0)2074959580', '77-79 Ebury Street, London, England ');
INSERT INTO public.staff VALUES (2, 'Lee Koffman', 'images/staff/leekoffman.jpg', '+44(0)2074959580', '77-79 Ebury Street, London, England');
INSERT INTO public.staff VALUES (4, 'Mary Roberton', 'images/staff/maryroberton.jpg', '+44(0)2074959580', '77-79 Ebury Street, London, England');
INSERT INTO public.staff VALUES (3, 'Martina Abiodum', 'images/staff/martinaabiodum.jpg', '+43(0)6766342527', 'Parkring 4, Vienna 1010 Austria');


--
-- Name: city_cit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.city_cit_id_seq', 2, true);


--
-- Name: staff_staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.staff_staff_id_seq', 8, true);


--
-- Name: cities city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT city_pkey PRIMARY KEY (city_id);


--
-- Name: estates estate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estates
    ADD CONSTRAINT estate_pkey PRIMARY KEY (id);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (staff_id);


--
-- Name: estates estate_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estates
    ADD CONSTRAINT estate_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.cities(city_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: estates estate_staff_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estates
    ADD CONSTRAINT estate_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES public.staff(staff_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

