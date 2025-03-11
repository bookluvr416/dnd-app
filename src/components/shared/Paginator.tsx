/**
 * Button
 * Reusable component for page number buttons on non-mobile view
 */

interface ButtonProps {
  pageNumber: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
}

const Button: React.FC<ButtonProps> = ({
    pageNumber,
    currentPage,
    onPageChange,
    totalPages,
  }) => {
  const css = currentPage === pageNumber ? 'z-10 bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-inset focus:border-purple-700' : 'ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-inset focus:border-purple-700';
  let roundedCss = '';
  if (currentPage === totalPages && pageNumber === totalPages) {
    roundedCss = 'rounded-r-md';
  } else if (currentPage === 1 && pageNumber === 1) {
    roundedCss = 'rounded-l-md';
  }

  return (
    <button
      type="button"
      onClick={() => onPageChange(pageNumber)}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 hover:bg-indigo-900 ${css} ${roundedCss}`}
    >
      {pageNumber}
    </button>
  )
};

/**
 * EdgeButtons
 * Component for the first/last buttons on non-mobile view
 */

interface EdgeButtonsProps {
  type: 'prev' | 'next';
  onPageChange: (pageNumber: number) => void;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const EdgeButtons: React.FC<EdgeButtonsProps> = ({
    type,
    onPageChange,
    totalPages,
    hasPreviousPage,
    hasNextPage
  }) => {
  if (type === 'prev' && hasPreviousPage) {
    return (
      <button
        type="button"
        onClick={() => onPageChange(1)}
        disabled={!hasPreviousPage}
        className="relative inline-flex items-center px-2 py-2 ring-1 rounded-l-md ring-inset focus:z-20 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-inset focus:border-purple-700"
      >
        First
      </button>
    )
  } else if (type === 'next' && hasNextPage) {
    return (
      <button
        type="button"
        onClick={() => onPageChange(totalPages)}
        disabled={!hasNextPage}
        className="relative inline-flex items-center px-2 py-2 ring-1 rounded-r-md ring-inset focus:z-20 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-inset focus:border-purple-700"
      >
        Last
      </button>
    )
  }
};

/**
 * MobileEdgeButtons
 * Component for the previous/next buttons on mobile view
 */

interface MobileEdgeButtonsProps {
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const MobileEdgeButtons: React.FC<MobileEdgeButtonsProps> = ({
  onPageChange,
  currentPage,
  hasNextPage,
  hasPreviousPage
}) => {
  return (
    <div className="flex flex-1 justify-between sm:hidden">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="relative inline-flex items-center px-2 py-2 ring-1 rounded-md ring-inset focus:z-20 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-inset focus:border-purple-700"
      >
        Previous
      </button>
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="relative inline-flex items-center px-2 py-2 ring-1 rounded-md ring-inset focus:z-20 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-inset focus:border-purple-700"
      >
        Next
      </button>
    </div>
  )
}

/**
 * Paginator
 * pagination component
 */

interface Props {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const Paginator: React.FC<Props> = ({
  totalResults,
  totalPages,
  currentPage,
  pageSize,
  onPageChange,
  hasNextPage,
  hasPreviousPage
}) => {
  const startResultNumber = ((pageSize * (currentPage - 1)) + 1) || 1;
  const endResultNumber = hasNextPage ? (startResultNumber + (pageSize - 1)) : totalResults;

  /**
   * createPageButtons
   * Creates the inner page buttons
   * @returns array of jsx items
   */
  const createPageButtons = () => {
    // if total number of pages is <= 4, show all buttons
    if (totalPages <= 4) {
      return [...new Array(totalPages)].map((_val, index) => (
        <Button
          pageNumber={index + 1}
          currentPage={currentPage}
          key={index + 1}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      ))
    }

    // else, show specific pages. if not pages 1 to 2, or last-1 to last, then show prev current next)
    return [...new Array(totalPages)].map((_val, index) => {
      const page = index + 1;
      if (
        (currentPage === 1 && (page - currentPage < 2))
        || (currentPage === page)
        || (currentPage - page === 1 || page - currentPage === 1)
      ) {
        return (
          <Button
            pageNumber={page}
            currentPage={currentPage}
            key={page}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        )
      } else if (
        (currentPage < page && page - currentPage < 3)
        || (currentPage > page && currentPage - page < 3)
      ) {
        return <span key={page} className="relative inline-flex items-center px-4 py-2 text-sm font-semibol ring-1 ring-inset focus:outline-none">...</span>;
      }
      else {
        return null;
      }
      
    }).filter((item) => item !== null);
  }

  return (
    <div className="flex items-center justify-between ring-1 ring-blue-700/50 bg-indigo-950 px-4 py-3 sm:px-6">
      <MobileEdgeButtons
        currentPage={currentPage}
        onPageChange={onPageChange}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
      />
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm">
            Showing {startResultNumber} to {endResultNumber} of {totalResults} results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md" aria-label="Pagination">
            <EdgeButtons
              type='prev'
              onPageChange={onPageChange}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
            {createPageButtons()}
            <EdgeButtons
              type='next'
              onPageChange={onPageChange}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
            />
          </nav>
        </div>
      </div>
    </div>
  )
};

export default Paginator;
