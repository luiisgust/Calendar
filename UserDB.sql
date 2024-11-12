CREATE USER 'calendar'@'localhost' IDENTIFIED BY 'c4l3nd4r2024';

GRANT ALL PRIVILEGES ON calendar.* TO 'calendar'@'localhost';

FLUSH PRIVILEGES;