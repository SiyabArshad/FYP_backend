CREATE DATABASE IF NOT EXISTS digischool;
use digischool;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255),
  `phone` VARCHAR(255),
  `address` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` INTEGER,
  FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INTEGER AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `admin` TINYINT(1) DEFAULT false,
  `role` ENUM('teacher', 'admin', 'student') DEFAULT 'teacher',
  `profile` VARCHAR(255) DEFAULT '',
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS teachers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  phone VARCHAR(255),
  address VARCHAR(255),
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    phone VARCHAR(255),
    address VARCHAR(255),
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    total_expense DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total_earning DECIMAL(10, 2) NOT NULL DEFAULT 0,
    fee_received DECIMAL(10, 2) DEFAULT 0,
    bill_paid DECIMAL(10, 2) DEFAULT 0,
    stationary_spending DECIMAL(10, 2) DEFAULT 0,
    salaries_paid DECIMAL(10, 2) DEFAULT 0
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    classname VARCHAR(255) NOT NULL,
    section VARCHAR(255) DEFAULT 'Alpha',
    teacherId INT,
    FOREIGN KEY (teacherId) REFERENCES teachers(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status BOOLEAN DEFAULT false,
    classId INT,
    studentId INT,
    FOREIGN KEY (classId) REFERENCES classes(id),
    FOREIGN KEY (studentId) REFERENCES students(id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS attendances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    status ENUM('present', 'absent') NOT NULL,
    enrollmentId INT,
    FOREIGN KEY (enrollmentId) REFERENCES enrollments(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255),
    obtainedmarks INT NOT NULL,
    totalmarks INT NOT NULL,
    grade VARCHAR(255),
    enrollmentId INT,
    FOREIGN KEY (enrollmentId) REFERENCES enrollments(id)
) ENGINE=InnoDB;



