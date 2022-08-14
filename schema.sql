CREATE TABLE if not exists player (
    playername character varying(255) NOT NULL,
    highscore integer DEFAULT 0 NOT NULL,
    knowledge integer DEFAULT 0 NOT NULL,
    password character varying(255) NOT NULL,
    PRIMARY KEY (playername)
);

CREATE TABLE if not exists auth_token (
    id character varying(255) NOT NULL,
    playername character varying(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (playername) REFERENCES player(playername)
);

CREATE TABLE if not exists skin (
    id integer NOT NULL,
    cost integer NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO skin (id, cost) VALUES (0, 0);
INSERT INTO skin (id, cost) VALUES (1, 20);
INSERT INTO skin (id, cost) VALUES (2, 50);
INSERT INTO skin (id, cost) VALUES (3, 100);

CREATE TABLE if not exists player_has_skin (
    skin_id integer NOT NULL,
    playername character varying(255) NOT NULL,
    PRIMARY KEY (skin_id, playernname),
    FOREIGN KEY (playername) REFERENCES player(playername),
    FOREIGN KEY (skin_id) REFERENCES skin(id)
);