const dayExpenseShowBtn=document.querySelector('#dayshowbtn')

dayExpenseShowBtn.addEventListener('click', () => {

  const tbody=document.querySelector('#dayexpenses')

  const day=document.querySelector('#day')

    const selectedDay = day.value;

    const selectedDate=new Date(selectedDay)

    const Day=selectedDate.getDate()

    const Month=selectedDate.getMonth()+1

    const Year=selectedDate.getFullYear()
     
    tbody.innerHTML=''  
    const token = localStorage.getItem('token');
    axios.get(`http://51.20.75.252:3000/expense/day-expenses?day=${Day}&month=${Month}&year=${Year}`,{ headers: { "Authorization": token } })
      .then((res) => {
        
        const expenses=res.data.expenses

        const totalAmount=document.querySelector('#totalAmount')
        totalAmount.innerHTML=`${res.data.totalAmount}`

        for(let dayExpense of expenses){
            
            const tr=document.createElement('tr')
               tr.innerHTML=`
               <td>${dayExpense.day}-${dayExpense.month}-${dayExpense.year}</td>
               <td>${dayExpense.description}</td>
               <td>${dayExpense.category}</td>
               <td>${dayExpense.amount}</td>

                `
            tbody.appendChild(tr)

        }
      })
      .catch((error) => {
        if(error.response.data){
          alert(error.response.data.error)
          
        }
      })
  })

  monthshowbtn=document.querySelector('#monthshowbtn')
  
  monthshowbtn.addEventListener('click',()=>{
    const tbody=document.querySelector('#monthlyexpenses')

    const month=document.querySelector('#month')
    const  selectedMonth=month.value

    const selectedDate=new Date(selectedMonth)
    const Month=selectedDate.getMonth()+1
    const Year=selectedDate.getFullYear()

    const token = localStorage.getItem('token');
    tbody.innerHTML=''
    axios.get(`http://51.20.75.252:3000/expense/month-expenses?month=${Month}&year=${Year}`,{ headers: { "Authorization": token } })
      .then((res) => {
        const monthlyTotalAmount=document.querySelector("#monthTotalAmount")
        monthlyTotalAmount.innerHTML=`${res.data.totalAmount}`

        const expenses=res.data.expenses
        for(let monthExpense of expenses){
          const tr=document.createElement('tr')
             tr.innerHTML=`
             <td>${monthExpense.day}-${monthExpense.month}-${monthExpense.year}</td>
             <td>${monthExpense.description}</td>
             <td>${monthExpense.category}</td>
             <td>${monthExpense.amount}</td>

              `
              tbody.appendChild(tr)
        }

  }).catch((error) => {
    if(error.response.data){
      alert(error.response.data.error)
    }
  
  })
})
  