
function highlight(table) {
  for (let i = 0; i < table.tBodies[0].rows.length; i++) {
    let row = table.tBodies[0].rows[i];

    let cellStatus = row.cells[3];
    let cellGender = row.cells[2];
    let cellAge = row.cells[1];
    
    if (cellStatus.dataset.available === 'true') { row.classList.add('available'); }
    else if (cellStatus.dataset.available === 'false') { row.classList.add('unavailable'); }
    else if (cellStatus.dataset.available === undefined) { row.setAttribute('hidden', true); }

    if (cellGender.textContent == 'm') { row.classList.add('male'); }
    else if (cellGender.textContent == 'f') { row.classList.add('female'); }

    if (cellAge.textContent < 18) { row.style.textDecoration = 'line-through'; }
  }
}