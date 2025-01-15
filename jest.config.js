module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/src/tests/joke.test.ts'], // Ajusta esta ruta según la ubicación de tus archivos de prueba
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
  