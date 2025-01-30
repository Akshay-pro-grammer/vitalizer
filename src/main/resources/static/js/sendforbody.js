async function sendMessage() {
    const ids = document.getElementById('body-sub').value;
    document.getElementById('body-sub').value = ''; // Clear input field

    try {
        const response = await fetch('/meds/subbody?ids=' + encodeURIComponent(ids), {
            method: 'POST', // Use GET method as per your endpoint structure
        });

        const data = await response.json();

        // Create a new table for the fetched data
        const newTable = document.createElement('table');
        newTable.className = "w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4";
        newTable.innerHTML = `
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
                    <th scope="col" class="px-6 py-3">Name</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-600" id="subBodyTable">
            </tbody>
        `;
        document.getElementById('fetchedResults').appendChild(newTable);

        // Populate the new table with fetched data
        const subBodyTable = newTable.querySelector('#subBodyTable');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.classList.add("bg-white", "border-b", "dark:bg-gray-800", "dark:border-gray-700", "hover:bg-gray-50", "dark:hover:bg-gray-600");
            row.innerHTML = `
                <td class="py-2 px-4">${item.ID}</td>
                <td class="py-2 px-4">${item.Name}</td>
            `;
            subBodyTable.appendChild(row);
            const el=document.getElementById('submit-body');
            el.disabled=true;
            const al=document.getElementById('successalert');
            al.classList.remove('hidden');
            document.getElementById('submit-body-sub').classList.remove("hidden");
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}