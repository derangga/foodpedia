db_seed:
	bunx prisma db execute --file ./prisma/seeds/User_202503241104.sql
	bunx prisma db execute --file ./prisma/seeds/Category_202503241103.sql
	bunx prisma db execute --file ./prisma/seeds/Recipe_202503241104.sql
	bunx prisma db execute --file ./prisma/seeds/Comment_202503241103.sql
	bunx prisma db execute --file ./prisma/seeds/Favorite_202503241103.sql

