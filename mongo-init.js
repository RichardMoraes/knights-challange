db.createUser(
    {
        user: "backend",
        pwd: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
        roles: [
            {
                role: "readWrite",
                db: "knights-crud",
            }
        ]
    }
);