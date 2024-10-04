import { useState } from 'react';

// Define a type for categories
type Category = {
  title: string;
  slug: {
    current: string;
  };
};

interface CategoryListProps {
  categories: Category[];  // Array of Category objects
  onCategoryClick: (category: string) => void;
}

const CategoryList = ({ categories, onCategoryClick }: CategoryListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        {/* Dropdown toggle button for mobile */}
        <button
          onClick={toggleDropdown}
          className="lg:hidden text-gray-200 border-lime-50 font-bold hover:text-customBlue focus:outline-none"
        >
          {isOpen ? 'Close' : 'Open'}
        </button>
      </div>

      {/* Dropdown content */}
      <ul
        className={`space-y-3 mt-4 lg:mt-0 transition-all duration-300 lg:block ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {categories.map((category) => (
          <li
            key={category.slug.current} // Use unique slug for the key
            onClick={() => onCategoryClick(category.title)}
            className="transition-transform duration-300 hover:scale-95 text-gray-200 hover:text-customBlue cursor-pointer"
          >
            {category.title} {/* Render category title */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
