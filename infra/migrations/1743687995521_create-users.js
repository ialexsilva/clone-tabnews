const { notFound } = require("next/navigation");

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    // For reference, Github limits 39 characters for the username
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(72)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
