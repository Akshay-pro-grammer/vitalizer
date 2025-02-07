
function searchSymptoms() {
    let input = document.getElementById('table-search').value.toUpperCase();
    let tableBody = document.getElementById('symptomsTable');
    let rows = tableBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let symptomIDCell = rows[i].getElementsByTagName('td')[0];
        let symptomNameCell = rows[i].getElementsByTagName('td')[1];
        if (symptomIDCell || symptomNameCell) {
            let symptomID = symptomIDCell.textContent || symptomIDCell.innerText;
            let symptomName = symptomNameCell.textContent || symptomNameCell.innerText;

            if (symptomID.toUpperCase().indexOf(input) > -1 || symptomName.toUpperCase().indexOf(input) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}