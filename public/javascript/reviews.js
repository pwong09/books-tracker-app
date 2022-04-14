const editReviewEl = document.querySelector('.edits-review');
const editReviewFormEl = document.querySelector('.edit-review-form');
const addReviewEl = document.querySelector('#adds-review');
const newReviewFormEl = document.querySelector('.add-review-form');
const editNoteEl = document.querySelector('#edits-note');
const editNoteFormEl = document.querySelector('.edit-note-form')

if (editReviewEl) editReviewEl.addEventListener('click', handleClick);
if (editNoteEl) editNoteEl.addEventListener('click', handleClick);

addReviewEl.addEventListener('click', handleClick);

function handleClick(e) {
    if (e.target.className === 'edits-review') editReviewFormEl.style.display = 'block';
    if (e.target.id === 'adds-review') newReviewFormEl.style.display = 'block';
    if (e.target.id === 'edits-note') editNoteFormEl.style.display = 'block';
    if (editReviewEl && editReviewFormEl.style.display === 'block') editReviewEl.style.display = 'none'; 
    if (editNoteEl && editNoteFormEl.style.display === 'block') editNoteEl.style.display = 'none'; 
    if (newReviewFormEl.style.display === 'block') addReviewEl.style.display = 'none';
}
