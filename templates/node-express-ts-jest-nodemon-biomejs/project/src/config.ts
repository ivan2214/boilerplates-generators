const config = {
	env: process.env.NODE_ENV || "development",
	debug: process.env.APP_DEBUG === "true",
	port: Number.parseInt(process.env.PORT || "3000"),
	getDataBaseConfig: () => ({
		database: process.env.DB_NAME || "test",
		username: process.env.DB_USERNAME || "test",
		password: process.env.DB_PASSWORD || "test",
		host: process.env.DB_HOST || "localhost",
		port: Number.parseInt(process.env.DB_PORT || "3306"),
	}),
};

export default config;
