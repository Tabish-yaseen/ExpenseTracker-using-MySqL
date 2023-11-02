
   const token=localStorage.getItem('token')
   let sno=1
  axios.get('http://51.20.75.252:3000/expense/getdownloadedURLS',{headers:{"Authorization":token}}).then((res)=>{
    const downloadedFiles=res.data.downloadedFiles
    for(let file of downloadedFiles){
        const tbody=document.querySelector('#tbody')

        const date = new Date(file.date);
        const formattedDate = date.toISOString().split("T")[0]

        const a=document.createElement('a')
        a.href=file.URL
        a.innerHTML = "Click to Download Again";

        
        const tr=document.createElement('tr')
        tr.innerHTML=`
        <td>${sno++}</td>
        <td>${formattedDate}</td>
         <td>${a.outerHTML}</td>
        `
        tbody.appendChild(tr)
             
    }

}).catch((error) => {
    if ( error.response.data.error) {
        
        alert(error.response.data.error);
    } else {

        console.error(error);
    }
  });


