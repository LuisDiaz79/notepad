DROP DATABASE IF EXISTS notepad_db;
CREATE DATABASE notepad_db;
USE notepad_db;

-- Create the tables table
CREATE TABLE notes
(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (255) NOT NULL,
  note VARCHAR (255) NOT NULL,
  note_date date,  
  PRIMARY KEY(id)
);
