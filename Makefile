db_seed:
	bunx prisma db execute --file ./prisma/seeds/user_202503071531.sql
	bunx prisma db execute --file ./prisma/seeds/category_202503061225.sql
	bunx prisma db execute --file ./prisma/seeds/recipe_202503071531.sql 