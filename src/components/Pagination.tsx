interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const previousPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => previousPage && onPageChange(previousPage)}
        disabled={!previousPage}
        className={`px-4 py-2 sm:my-2 mx-4 
        text-white 
        border-2
        dark:bg-black
        bg-customBlue
        transition-all
        rounded-md
        border-customBlue hover:text-white hover:bg-black dark:hover:bg-customBlue
        duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-gray-500 ${
          previousPage ? 'text-customBlue' : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        Previous
      </button>

      <div className="flex space-x-2">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md border-2 
            transition-all duration-200 ${
              currentPage === page
                ? 'bg-customBlue text-white'
                : 'bg-white text-customBlue hover:bg-customBlue hover:text-white dark:bg-black dark:hover:bg-customBlue'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => nextPage && onPageChange(nextPage)}
        disabled={!nextPage}
        className={`px-4 py-2 sm:my-2 mx-4 
        text-white 
        border-2
        dark:bg-black
        bg-customBlue
        transition-all
        rounded-md
        border-customBlue hover:text-white hover:bg-black dark:hover:bg-customBlue
        duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-gray-500 ${
          nextPage ? 'text-customBlue' : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
