axios.get('http://51.20.75.252:3000/premium/showleaderboard').then((res) => {
    const leaderboardData = res.data;

    // Get the table body element
    const tbody = document.querySelector('#tbody');
    let position = 1;
    // Loop through the data and create table rows
    leaderboardData.forEach((details) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `

           <td>${position++}</td>
            <td>${details.name}</td>
            <td>${details.totalExpenses}</td>
        `;

        // Append the row to the table
        tbody.appendChild(tr);
    });
});