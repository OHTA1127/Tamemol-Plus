import React from 'react'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

function Pagenation({ currentPage, totalPages, onPageChange }: Props) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div>
      <button onClick={handlePrevClick} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span> / <span>{totalPages}</span>
      <button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}
export default React.memo(Pagenation)
