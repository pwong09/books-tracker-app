//change the display for .edit-review to visible

const editReviewEl = document.querySelector('#edits-review');
const editReviewFormEl = document.querySelector('.edit-review-form');
const addReviewEl = document.querySelector('#adds-review');
const newReviewFormEl = document.querySelector('.add-review-form');
        
editReviewEl.addEventListener('click', handleClick);
addReviewEl.addEventListener('click', handleClick);

function handleClick(e) {
    if (e.target.id === 'edits-review') editReviewFormEl.style.display = 'block';
    if (e.target.id === 'adds-review') newReviewFormEl.style.display = 'block';
    if (editReviewFormEl.style.display === 'block') editReviewEl.style.display = 'none';    
    if (newReviewFormEl.style.display === 'block') addReviewEl.style.display = 'none';
}
