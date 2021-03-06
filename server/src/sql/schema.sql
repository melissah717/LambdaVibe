CREATE TABLE IF NOT EXISTS songs (
    id int NOT NULL PRIMARY KEY,
    song_title text NOT NULL,
    notes varchar NOT NULL,
    author text NOT NULL
);

INSERT INTO songs (id, song_title, author, notes) 
VALUES (1, 'Ode to Joy (Dubstep Remix)', 'DJ Mobley', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4'),
(2, 'Concertino in C', 'Chaminade', 'D3 E3 Gb3 A3 Gb3 Gb3 E3 D3 E3 D3 D3 Db3 B2 A2 B2 Db3 D3 Gb3 G3 B3 A3 Gb3 E3 D3 B2 E3 D3'),
(3, 'Danny Boy', 'DJ Meow', 'E2 F2 G2 A2 G2 A2 D3 C3 A2 G2 F2 D2 F2 A2 Bb2 C3 D3 C3 A2 F2 A2 G2 E2 F2 G2 A2 G2 A2 D3 C3 A2 G2 F2 D2 E2 F2 G2 A2 Bb2 A2 G2 F2 G2 F2'),
(4, 'Chromatic Scale', 'BorpaChef', 'C1 Db1 D1 Eb1 E1 F1 Gb1 G1 Ab1 A1 Bb1 B1 C2 Db2 D2 Eb2 E2 F2 Gb2 G2 Ab2 A2 Bb2 B2 C3 Db3 D3 Eb3 E3 F3 Gb3 G3 Ab3 A3 Bb3'),
(5, 'To Zanarkand', 'Nobuo Uematsu', 'E3 B2 E3 Gb3 G3 Gb3 E3 D3 E3 D3 B2 E3 B2 E3 Gb3 G3 Gb3 G3 A3 G3 A3 B3'),
(6, 'Sing to the Moon', 'Lauren Mvula', 'D3 C3 D3 F3 F3 F3 F3 D3 C3 C3 Bb2 D3 D3 D3 D3 C3 Bb2 Bb2 G2 D3 C3 D3 D3 D3 G3 G3 G3 G3 F3 D3 D3 C3 D3 D3 C3 Bb2 Bb2 G2'),
(7, 'In The Air Tonight', 'Phil Collins', 'E1 A2 E2 A3 E3 A4 E1 A2 E2 A3 E3 A4'), -- Alternative After Drum Fill: E1 A2 E2 A3 E3 A4
(8, 'Vampires', 'The Midnight', 'Bb1 Db1 Ab3 Gb1 Db1 Ab3 Gb1 Db1 Ab3 Gb1 Db1 Ab3 Gb1'),
(9, 'Epic Sax', 'Sergey Stepanov', 'B1 B1 B1 B1 B1 A1 B1 B1 B1 B1 B1 A1 B1 B1 D1 B1 A1 G1 E1 E1 F1 G1 E1')