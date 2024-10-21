// components/CategoryList.tsx
import { CategoryListProps } from '../app/types';


const CategoryList = ({ categories, onCategoryClick, selectedCategory }: CategoryListProps) => {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-800 px-1 sm:px-6 py-2 rounded-lg shadow-2xl">

      {/* Horizontal scrollable list for mobile */}
      <div className="block md:hidden lg:hidden">
        <div className="flex gap-1">
          <h2 className="text-lg font-bold pl-1 dark:bg-gray-800 dark:text-gray-200 rounded py-1">Categories</h2>
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-2">
            <button
              onClick={() => onCategoryClick('All')}
              className={`flex-shrink-0 transition-transform duration-300 hover:scale-95 font-semibold px-4 py-2 rounded cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-customBlue text-white'
                  : 'bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => onCategoryClick(category.title)}
                className={`flex-shrink-0 transition-transform duration-300 hover:scale-95 font-semibold px-4 py-2 rounded cursor-pointer ${
                  selectedCategory === category.title
                    ? 'bg-customBlue text-white'
                    : 'bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-gray-200'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Original list for larger screens */}
      <ul className="hidden md:block lg:block space-y-3 text-center mt-0.5 sm:m-0.5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Categories</h2>
        <li
          onClick={() => onCategoryClick('All')}
          className={`transition-transform duration-200 hover:scale-95 cursor-pointer space-x-2 dark:text-gray-200 px-4 py-2 rounded ${
            selectedCategory === 'All'
              ? 'bg-customBlue text-white'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
          }`}
        >
          All
        </li>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onCategoryClick(category.title)}
            className={`transition-transform duration-200 hover:scale-95 cursor-pointer space-x-2 dark:text-gray-200 px-4 py-2 rounded ${
              selectedCategory === category.title
                ? 'bg-customBlue text-white'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200'
            }`}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
