module.exports = {
	credentials: {
		user: "test",
		password: "test",
		database: "database1"
	},
	options: {
		outputPath: __dirname + "/rest-1",
		exportLive: true
	},
	extensions: {
        perColumn: {
            User: {
                id: {
                    description: "This is an extra, injected information field.",
                }
            }
        },
        perModel: {
            User: {
                description: "This is an extra, injected information for a table.",
                stores: {
                    id: {},
                    name: {},
                    password: {}
                }
            }
        }
    }
};