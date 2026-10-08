import Book from "../models/book.model.js";
import CareerTrack from "../models/careerTrack.model.js";

export const getBooks = async ({ category, skillLevel, page = 1, limit = 10 }) => {
  const filter = {};
  if (category) filter.category = category;
  if (skillLevel) filter.skillLevel = skillLevel;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [books, total] = await Promise.all([
    Book.find(filter).skip(skip).limit(limitNum),
    Book.countDocuments(filter),
  ]);

  return {
    pagination: {
      total,
      page: pageNum,
      limit: limitNum
    },
    books,
  };
};

export const createBook = async (bookData) => {
  return await Book.create(bookData);
};

export const getCareerTracks = async ({ domain }) => {
  const filter = {};
  if (domain) filter.domain = domain;

  return await CareerTrack.find(filter);
}