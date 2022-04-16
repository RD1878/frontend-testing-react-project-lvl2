module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  transformIgnorePatterns: ["node_modules/(?!(@hexlet/react-todo-app-with-backend)/)"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "__tests__/mocks"
  ]
}