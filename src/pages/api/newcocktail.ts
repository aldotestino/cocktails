import prisma from '../../lib/prisma';

export default async (req, res) => {
  const { name, ingredients, addedby } = req.body;

  try {
    const newCocktail = await prisma.cocktail.create({ data: {
      name: name.replaceAll(' ', '-'),
      ingredients: ingredients.split(';'),
      addedby
    } });
  
    res.status(200).json(newCocktail);
  }catch(e) {
    res.status(400).json({ error: e.message });
  }
};
