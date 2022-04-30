CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
<<<<<<< HEAD
	artist text NOT NULL,
	notes varchar NOT NULL
);

INSERT INTO songs (id, song_title, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'DJ Beethoven' 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
(2, 'Concertino in C', 'Chaminade' 'D3 E3 Gb3 A3 Gb3 Gb3 E3 D3 E3 D3 D3 Db3 B2 A2 B2 Db3 D3 Gb3 G3 B3 A3 Gb3 E3 D3 B2 E3 D3');
=======
	notes varchar NOT NULL,
	author text NOT NULL
);

INSERT INTO songs (id, song_title, author, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'DJ Mobley', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
(2, 'Concertino in C', 'Chaminade', 'D3 E3 Gb3 A3 Gb3 Gb3 E3 D3 E3 D3 D3 Db3 B2 A2 B2 Db3 D3 Gb3 G3 B3 A3 Gb3 E3 D3 B2 E3 D3');
>>>>>>> ca589e77055f7e6167b251194d738eab660543e4
