//change the display for .edit-review to visible

const editReviewEl = document.querySelector('#edits-review');
const reviewFormEl = document.querySelector('.edit-review-form');
        
editReviewEl.addEventListener('click', handleClick);

function handleClick(e) {
    reviewFormEl.style.display = 'table-row';
    if (reviewFormEl.style.display === 'table-row') editReviewEl.style.display = 'none';    
}
