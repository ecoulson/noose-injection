module.exports = {
    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },
    setupFilesAfterEnv: ['./test/jest-setup.ts'],
}
