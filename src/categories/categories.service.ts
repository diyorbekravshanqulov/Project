import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './model/category.model';

/**
 * Service responsible for handling business logic related to categories.
 * This service interacts with the Category model to perform CRUD operations.
 */
@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryRepo: typeof Category) {}

  /**
   * Creates a new category.
   * @param createCategoryDto Data for creating the category.
   * @returns The newly created category.
   */
  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.create(createCategoryDto);
  }

  /**
   * Retrieves all categories.
   * @returns All categories with associated data.
   */
  async findAll() {
    return this.categoryRepo.findAll({ include: { all: true } });
  }

  /**
   * Retrieves a specific category by its ID.
   * @param id The ID of the category to retrieve.
   * @returns The category with the specified ID.
   */
  async findOne(id: number) {
    return this.categoryRepo.findByPk(id);
  }

  /**
   * Updates a specific category by its ID.
   * @param id The ID of the category to update.
   * @param updateCategoryDto Data for updating the category.
   * @returns The updated category.
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.update(updateCategoryDto, {
      where: { id },
      returning: true,
    });
    return category[1][0];
  }

  /**
   * Removes a specific category by its ID.
   * @param id The ID of the category to remove.
   * @returns A message indicating the success of the operation.
   */
  async remove(id: number) {
    const categoryRows = await this.categoryRepo.destroy({ where: { id } });
    if (categoryRows == 0) return 'Not found';
    return 'successfully removed';
  }
}
