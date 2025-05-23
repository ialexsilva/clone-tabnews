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
      type: "varchar(60)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
      notNull: true,
    },
    updated_at: {
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
      notNull: true,
    },
  });
};

exports.down = false;
