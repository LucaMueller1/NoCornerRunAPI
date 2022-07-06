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