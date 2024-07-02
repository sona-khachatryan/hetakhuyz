import {useState} from 'react';
import './pagination.style.scss';

// eslint-disable-next-line react/prop-types
function Pagination({totalElements,contentBeginning,setContentBeginning, elementsPerPage}) {

    const maxPagesToShow = 4;
    const totalPages = Math.ceil(totalElements / elementsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const getVisiblePages = (currentPage, totalPages) => {
        let startPage = Math.max(currentPage - 1, 1);
        let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(endPage - maxPagesToShow + 1, 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = getVisiblePages(currentPage, totalPages);

    const handlePageClick = (page) => {
        setCurrentPage(page);
        setContentBeginning((+page * +elementsPerPage)- +elementsPerPage)
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        setContentBeginning(contentBeginning + +elementsPerPage);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        setContentBeginning(contentBeginning - +elementsPerPage);
    };

    return (
        <>
            {totalElements > +elementsPerPage ?
                <div className="paginate_ctn">
                    <div className={"arrow " + (currentPage === 1 ? "" : "arrow_active")} onClick={currentPage === 1 ? null : handlePrev}>
                        ←
                    </div>
                    {visiblePages.map((page) => (
                        <div
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={"round_effect " + (page === currentPage ? "paginate_active" : "")}
                        >
                            {page}
                        </div>
                    ))}
                    <div className={"arrow " + (currentPage === totalPages ? "" : "arrow_active")} onClick={currentPage === totalPages ? null : handleNext}>
                        →
                    </div>
                </div>
                :
                ''
            }
        </>
    );
}

export default Pagination;