import prisma from '../../lib/prisma';
import { CocktailRaw } from '../../types';

export default async (req, res) => {
  const { name, ingredients, addedby } : CocktailRaw = req.body;

  try {
    const newCocktail = await prisma.cocktail.create(
      { 
        data: {
          name: name.toLowerCase().replace(/ /g, '-'),
          ingredients: ingredients.toLowerCase().split(';'),
          addedby
        } 
      }
    );
  
    res.status(200).json(newCocktail);
  }catch(e) {
    res.status(400).json({ error: e.message });
  }
};
