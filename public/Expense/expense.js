//function parsing the token
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const premiumButton=document.querySelector('#premium-button')
const premiumMessage = document.querySelector('#premium-message');

const expenseForm=document.querySelector('#expenseform')


const tbody= document.querySelector('#tbody')

//logout
const logout=document.querySelector('#logout')
logout.addEventListener('click',()=>{
    window.location.href = '../Login/login.html';
})
// home
const home=document.querySelector('#home')
home.addEventListener('click',()=>{
    window.location.href = 'expense.html';
})
//SHOW PREVIOUS DOWNLOADS
const previousDownloads=document.querySelector('#showdownloads')
previousDownloads.addEventListener('click',()=>{
    window.location.href='../Download/download.html'
})

// adding expenses
expenseForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const  amount=document.querySelector('#amount')
    const description=document.querySelector('#description')
    const category=document.querySelector('#category')

    const  details={
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    const token=localStorage.getItem('token')
    axios.post('http://51.20.75.252:3000/expense/add-expenses',details,{headers:{"Authorization":token}}).then((res)=>{
        expenseForm.reset()
        showOnScreen(res.data)

    }) 

})

// checking for premium
function checkPremium(){
    const token=localStorage.getItem('token')
    const decodeToken=parseJwt(token)
    let isPremium=decodeToken.isPremium
    return isPremium

}

//leaderboard button which will redirect to leaderboard page if premium or show alert incase not premium
const leaderboardbtn=document.querySelector('#leaderboardbtn')
leaderboardbtn.addEventListener('click',()=>{
    const isPremium=checkPremium()
    if(isPremium){
        window.location.href = '../Leaderboard/leaderboard.html'
    }
    else{
        alert('Buy premium to access this features')
    }
    

})
//report button which will redirect to report page if premium or show alert incase not premium
const report=document.querySelector('#report')
report.addEventListener('click',()=>{
    const isPremium=checkPremium()
    if(isPremium){
        window.location.href = '../Report/report.html'

    }
    else{
        alert('Buy premium to access this features')
    }
    
    

})

window.addEventListener('DOMContentLoaded',()=>{
let isPremium=checkPremium()
if(isPremium){
    premiumButton.style.display = "none";        
     premiumMessage.innerHTML = 'Premium Member';


}

// expenses per page
const expensesPerPage=document.querySelector('#rows')

const selectedLimit=localStorage.getItem('expensesPerPage')
const page=1

if(selectedLimit){ 
    expensesPerPage.value=selectedLimit
    getAllProducts(page,selectedLimit)
}
else{
    getAllProducts(page,expensesPerPage.value)
}
    
    
})


// if we change the expenseperpage
const expensesPerPage=document.querySelector('#rows')

expensesPerPage.addEventListener('change',()=>{
    const limit=expensesPerPage.value
    localStorage.setItem('expensesPerPage', limit)
    const page=1
    getAllProducts(page,limit)

})

// function for getting all the expenses of authenticated user
function getAllProducts(page,limit){
    const token=localStorage.getItem('token')
    tbody.innerHTML=""
    axios.get(`http://51.20.75.252:3000/expense/get-expenses?page=${page}&expensePerPage=${limit}`,{headers:{"Authorization":token}}).then((res)=>{
        const expenses=res.data.expenses
        const pagination=res.data.pagination
        
        for(let expense of expenses){
            showOnScreen(expense,page)
            
            
        }
        showPagination(pagination)

    })

}
// function displaying the pagination
function showPagination(pagination) {
    const{currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,lastPage}=pagination 
    const paginationDiv = document.querySelector('#pagination-button');
    paginationDiv.innerHTML = '';
  
    // Function to create a button element and add an event listener
    function createPageButton(pageNumber) {
      const btn = document.createElement('button');
      btn.innerHTML = pageNumber;
      btn.addEventListener('click', () => {
        const selectedLimit=localStorage.getItem('expensesPerPage')
        getAllProducts(pageNumber,selectedLimit);
      });
      return btn;
    }
  
    if (hasPreviousPage) {
        const  btn1=createPageButton(previousPage)
         paginationDiv.appendChild(btn1);
    }
    if(currentPage!=lastPage){
        const btn2=createPageButton(currentPage)
        paginationDiv.appendChild(btn2);

    }
    if (hasNextPage) {
        const btn3=createPageButton(nextPage)
        paginationDiv.appendChild(btn3);
    }
  
    if(lastPage)
    paginationDiv.appendChild(createPageButton(lastPage));
  }

// display the expenses
function showOnScreen(expense,page){  
    const tr=document.createElement('tr')
    tr.innerHTML=`
    <td> ${expense.day}-${expense.month}-${expense.year}</td>
    <td> ${expense.category}</td>
    <td>${expense.description}</td>
    <td>${expense.amount}</td>
    <button class="delete" onClick="deleteExpense(${expense.id}, ${page}, event)">Delete Product</button>
    `
    tbody.appendChild(tr)

}

// deleting the expenses
function deleteExpense(id,page,e) {
    const token = localStorage.getItem('token');
    axios.delete(`http://51.20.75.252:3000/expense/delete-expense/${id}`, { headers: { "Authorization": token } })
        .then((res) => {
            // Remove the corresponding row from the table
            const tr = e.target.parentElement;
            tbody.removeChild(tr);
            
            // After successfully deleting the expense, reload and display expenses
            const expensesPerPage = document.querySelector('#rows');
            const selectedLimit = localStorage.getItem('expensesPerPage') || expensesPerPage.value;
            getAllProducts(page, selectedLimit);
        })
        .catch((error) => {
            console.error(error);
        });
}


// buying the premium and updating the transactional status
premiumButton.addEventListener('click',(e)=>{
    const token=localStorage.getItem('token')
    
    axios.get('http://51.20.75.252:3000/purchase/premiummembership',{headers:{"Authorization":token}}).then((res)=>{
        // console.log(res)
        const options = {
            "key": res.data.key_id,
            "order_id": res.data.order.id,
            "handler": async function (response) {
                try {
                    // Send the payment details to the server to update the transaction status
                   const res= await axios.post('http://51.20.75.252:3000/purchase/updatetransactionstatus', {
                        orderId: options.order_id,
                        paymentId: response.razorpay_payment_id
                    }, { headers: { "Authorization": token } });


                    localStorage.setItem('token',res.data.token)

                    alert('You Are Now Premium User.You Can Access Leaderboard And Report Features')

                    premiumButton.style.display = "none";
            
                    premiumMessage.innerHTML = 'Premium Member';               

                } catch (error) {
                    // Handle any errors that occur during payment processing
                    console.error('Payment failed:', error);
                }
            }
        }
        const rzp=new Razorpay(options)
        rzp.open()
        e.preventDefault()

        rzp.on('payment.failed',function(response){
            alert('something went wrong')
        })

    })

})

// download the expenses
const download=document.querySelector('#download')
download.addEventListener('click',()=>{
    const token=localStorage.getItem('token')
        axios.get("http://51.20.75.252:3000/expense/downloadExpenses",{headers:{"Authorization":token}}).then((res)=>{
            console.log(res.data.fileURL)
            if(res.status===200){
                const a=document.createElement('a')
            a.href=res.data.fileURL
            a.download='myexpense.csv'
            a.click() 
              
            }else{
                throw new Error(res.data.message)
            }
    
        }).catch((err)=>{
            errorMessage.innerHTML = err.message;
        })
    
        })


