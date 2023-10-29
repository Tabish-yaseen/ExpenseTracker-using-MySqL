const dayExpenseShowBtn=document.querySelector('#dayshowbtn')
const totalAmount=document.querySelector('#totalAmount')


dayExpenseShowBtn.addEventListener('click', () => {
  const dayexpense=document.querySelector('#dayexpenses')
  const day=document.querySelector('#day')
    const selectedDay = day.value;
    const selectedDate=new Date(selectedDay)
    const Day=selectedDate.getDate()
    const Month=selectedDate.getMonth()+1
    const Year=selectedDate.getFullYear()
     
    dayexpense.innerHTML=''  
    const token = localStorage.getItem('token');
    axios.get(`http://51.20.75.252:3000/expense/day-expenses?day=${Day}&month=${Month}&year=${Year}`,{ headers: { "Authorization": token } })
      .then((res) => {
        const expenses=res.data.expenses
        totalAmount.innerHTML=`${res.data.totalAmount}`
        for(let dayExpense of expenses){
            
            const tr=document.createElement('tr')
               tr.innerHTML=`
               <td>${dayExpense.day}-${dayExpense.month}-${dayExpense.year}</td>
               <td>${dayExpense.description}</td>
               <td>${dayExpense.category}</td>
               <td>${dayExpense.amount}</td>

                `
            dayexpense.appendChild(tr)


        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  monthshowbtn=document.querySelector('#monthshowbtn')
  
  monthshowbtn.addEventListener('click',()=>{
    const monthlyexpense=document.querySelector('#monthlyexpenses')

    const month=document.querySelector('#month')
    const  selectedMonth=month.value
    const selectedDate=new Date(selectedMonth)
    const Month=selectedDate.getMonth()+1
    const Year=selectedDate.getFullYear()
    const token = localStorage.getItem('token');
    monthlyexpense.innerHTML=''
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
              monthlyexpense.appendChild(tr)


        }

  })
})
  