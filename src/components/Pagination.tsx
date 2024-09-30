interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
  }
  
  const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  
    return (
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => previousPage && onPageChange(previousPage)}
          disabled={!previousPage}
          className={`px-4 py-2 sm:my-2 mx-4 
          text-white 
          border 
          bg-black
          transition-all
          rounded-md
          border-customBlue hover:text-white 
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-gray-500 ${previousPage ? 'text-customBlue' : 'text-gray-400 cursor-not-allowed'}`}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => nextPage && onPageChange(nextPage)}
          disabled={!nextPage}
          className={`px-4 py-2 sm:my-2 mx-4 
          text-white 
          border 
          bg-black
          transition-all
          rounded-md
          border-customBlue hover:text-white 
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-gray-500 ${nextPage ? 'text-customBlue' : 'text-gray-400 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    );
  };
  
  export default Pagination;
  