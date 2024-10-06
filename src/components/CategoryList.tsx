import { useState } from 'react';

// // Define a type for categories
// type Category = {
//   title: string;
//   slug: {
//     current: string;
//   };
// };

interface CategoryListProps {
  categories: any; // Array of Category objects
  onCategoryClick: (category: string) => void;
  // selectedCategory: string;
}

const CategoryList = ({ categories, onCategoryClick }: CategoryListProps) => {
  return (
    <div className=" px-2 py-2 rounded-lg shadow-lg">

      {/* Horizontal scrollable list for mobile */}
      <div className="block lg:hidden">
        <div className='flex gap-1'>
          <h2 className="text-lg font-bold px-1 bg-gray-300 dark:bg-gray-800 dark:text-gray-200 rounded py-1">Categories</h2>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-2">
            {categories.map((category: any) => (
              <button
                key={category.slug.current}
                onClick={() => onCategoryClick(category.title)}
                className="flex-shrink-0 transition-transform duration-300 hover:scale-95 bg-gray-300 dark:bg-gray-800 dark:text-gray-200 focus:ring-customBlue hover:text-customBlue px-4 py-2 rounded cursor-pointer"
              >
                {category.title}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Original list for larger screens */}
      <ul className="hidden lg:block space-y-3 mt-0.5">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 ">Categories</h2>
        {categories.map((category: any) => (
          <li
            key={category.slug.current}
            onClick={() => onCategoryClick(category.title)}
            className="transition-transform duration-300  text-center item-center hover:scale-95 text-gray-900 hover:text-customBlue  cursor-pointer bg-gray-300 dark:text-gray-100 dark:bg-gray-800 px-4 py-2 rounded"
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
