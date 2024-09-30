interface CategoryListProps {
    categories: string[];
    onCategoryClick: (category: string) => void;
  }
  
  const CategoryList = ({ categories, onCategoryClick }: CategoryListProps) => {
    return (
      <div className="bg-gray-600 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-3">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => onCategoryClick(category)}
              className="transition-transform duration-300 hover:scale-95 text-gray-200 hover:text-blue-600 cursor-pointer transition"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CategoryList;
  