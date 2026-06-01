// src/config/prisma.js
const { PrismaClient } = require('@prisma/client');

// No necesitas pasarle ningún adapter manual aquí si tu entorno es Node tradicional
const prisma = new PrismaClient();

module.exports = prisma;