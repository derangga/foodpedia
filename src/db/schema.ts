import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  index,
  text,
  integer,
  timestamp,
  boolean,
  serial,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  bio: text("bio"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => /* @__PURE__ */ new Date()),
  deletedAt: timestamp("deleted_at"),
});

export const recipes = pgTable(
  "recipes",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    image: text("image"),
    authorId: text("author_id").notNull(),
    categories: text("categories").array().notNull(),
    ingredients: text("ingredients").array().notNull(),
    story: text("story"),
    guide: text("guide").notNull(),
    createdAt: timestamp("created_at")
      .notNull()
      .$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp("updated_at").$defaultFn(
      () => /* @__PURE__ */ new Date()
    ),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("recipe_title_idx").on(table.title),
    index("recipe_categories_idx").on(table.categories),
    index("recipe_author_id_idx").on(table.authorId),
  ]
);

export const favorites = pgTable(
  "favorite",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    recipeOwnerId: text("recipe_owner_id")
      .notNull()
      .references(() => user.id),
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipes.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("favorite_user_id").on(table.userId),
    index("favorite_recipe_owner_id").on(table.recipeOwnerId),
    index("favorite_recipe_id").on(table.recipeId),
  ]
);

export const comments = pgTable(
  "comment",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    recipeId: integer("recipe_id")
      .notNull()
      .references(() => recipes.id),
    comment: text("comment").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [index("comment_recipe_id").on(table.recipeId)]
);

export const gptSession = pgTable(
  "gpt_session",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [index("gpt_session_user_id").on(table.userId)]
);

export const senderRoleEnum = pgEnum("sender_role", ["user", "assistant"]);

export const gptMessage = pgTable(
  "gpt_message",
  {
    sessionId: uuid("session_id").notNull(),
    senderRole: senderRoleEnum().notNull(),
    answerType: text("answer_type"),
    message: text("message").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [index("gpt_message_session_id").on(table.sessionId)]
);

export const usersRelations = relations(user, ({ many }) => ({
  recipes: many(recipes),
}));

export const recipesRelations = relations(recipes, ({ one }) => ({
  author: one(user, {
    fields: [recipes.authorId],
    references: [user.id],
  }),
}));

export const gptSessionRelations = relations(gptSession, ({ many }) => ({
  messages: many(gptMessage),
}));

export const gptMessageRelations = relations(gptMessage, ({ one }) => ({
  session: one(gptSession, {
    fields: [gptMessage.sessionId],
    references: [gptSession.id],
  }),
}));

export const schema = {
  user,
  session,
  account,
  verification,
};
