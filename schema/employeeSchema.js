const userSchema = `
  CREATE TABLE IF NOT EXISTS employees (
      id VARCHAR(255) UNIQUE NOT NULL,
      employee_joining_date DATE NOT NULL,
      employee_name VARCHAR(255),
      password VARCHAR(255)
  )
`;

module.exports = userSchema;
