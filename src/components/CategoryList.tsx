// components/CategoryList.tsx

import { Category } from '../app/types'; // Import the unified Category type

interface CategoryListProps {
  categories: Category[]; // Array of Category objects
  onCategoryClick: (category: string) => void;
}

const CategoryList = ({ categories, onCategoryClick }: CategoryListProps) => {
  return (
    <div className="bg-gray-900 px-6 py-2 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Categories:</h2>

      {/* Horizontal scrollable list for mobile */}
      <div className="block lg:hidden">
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-2">
          {categories.map((category, i) => (
            <button
              key={i} // Use unique slug for the key
              onClick={() => onCategoryClick(category.title)}
              className="flex-shrink-0 transition-transform duration-300 hover:scale-95 bg-gray-800 text-gray-200 hover:text-customBlue px-4 py-2 rounded cursor-pointer"
            >
              {category.title} {/* Render category title */}
            </button>
          ))}
        </div>
      </div>

      {/* Original list for larger screens */}
      <ul className="hidden lg:block space-y-3 mt-4">
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onCategoryClick(category.title)}
            className="transition-transform duration-300 hover:scale-95 text-gray-200 hover:text-customBlue cursor-pointer bg-gray-800 px-4 py-2 rounded"
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
