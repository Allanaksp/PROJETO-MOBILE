const prisma = require('@prisma/client').PrismaClient();
const z = require('zod');

// Definindo o schema de validação com Zod
const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['read', 'to read'], 'Invalid status'),
  coverImage: z.string().optional(),
});

exports.createBook = async ({ title, author, description, status, coverImage }) => {
  // Validando os dados
  const validatedData = bookSchema.parse({ title, author, description, status, coverImage });

  return await prisma.book.create({
    data: validatedData,
  });
};

exports.updateBook = async (id, { title, author, description, status, coverImage }) => {
  const validatedData = bookSchema.parse({ title, author, description, status, coverImage });

  return await prisma.book.update({
    where: { id: Number(id) },
    data: validatedData,
  });
};

exports.deleteBook = async (id) => {
  await prisma.book.delete({
    where: { id: Number(id) },
  });
};

exports.getBooks = async () => {
  return await prisma.book.findMany();
};
