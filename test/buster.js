var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "lib/*.js",
        "src/client/*.js",
        "src/server/*.js"
    ],
    tests: [
        "test/*-test.js",
        "*-test.js"
    ]
}