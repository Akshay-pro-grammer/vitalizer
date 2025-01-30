// Function to submit the second form
async function submitSecondForm() {
    const id = document.getElementById('body-sub2').value;
    const genderSelect = document.getElementById('gender');
    const selectedValue = genderSelect.value;

    try {
        const response = await fetch(`/meds/subsymptom?ids=${encodeURIComponent(id)}&gender=${encodeURIComponent(selectedValue)}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        const subBodyTableBody = document.getElementById('subBodyTableBody');
        // Populate the new table with fetched data
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "hover:bg-gray-50", "dark:hover:bg-gray-600");
            row.innerHTML = `
                <td class="py-2 px-4">${item.ID}</td>
                <td class="py-2 px-4">${item.Name}</td> 
                <td class="py-2 px-4">${item.Synonyms.join(', ')}</td>
            `;
            subBodyTableBody.appendChild(row);
        });

        // Disable the submit button and show alert
        document.getElementById('submitBtn').disabled = true;
        // document.getElementById('successalert').classList.remove('hidden');
        document.getElementById('submit-body-sub').classList.remove("hidden");

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}