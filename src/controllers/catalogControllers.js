import { getBooks, createBook, getCareerTracks } from "../services/catalogService.js";

export const listBooks = async (req, res, next) => {
  try {
    const { category, skillLevel, page, limit } = req.query;
    const { books, pagination } = await getBooks({ category, skillLevel, page, limit });

    res.status(200).json({
      success: true,
      data: books,
      pagination,
    });
  } catch (err) {
    next(err);
  }
};

export const addBook = async (req, res, next) => {
  try {
    const book = await createBook(req.body);
    res.status(201).json({
      success: true,
      data: { id: book._id, title: book.title },
    });
  } catch (err) {
    next(err);
  }
};

export const listCareerTracks = async (req, res, next) => {
  try {
    const { domain } = req.query;
    const { tracks } = await getCareerTracks({ domain });

    res.status(200).json({
      success: true,
      data: tracks
    });
  } catch (err) {
    next(err);
  }
}