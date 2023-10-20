
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
    const ul=document.querySelector('#showexpenses')

    
    
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
        axios.post('http://localhost:3000/expense/add-expenses',details,{headers:{"Authorization":token}}).then((res)=>{
            showOnScreen(res.data)

        })

    })
    window.addEventListener('DOMContentLoaded',()=>{
    const token=localStorage.getItem('token')

    const decodeToken=parseJwt(token)
    let isPremium=decodeToken.isPremium


    if(isPremium===true){
        premiumButton.style.display = "none";        
         premiumMessage.innerHTML = 'You Are a premium User';
         showLeaderBoard()

    }
        getAllProducts()
    })

    function getAllProducts(){
        const token=localStorage.getItem('token')
        // ul.innerHTML=""
        axios.get('http://localhost:3000/expense/get-expenses',{headers:{"Authorization":token}}).then((res)=>{
            console.log(res.data)
            for(let expense of res.data){
                showOnScreen(expense)
                
            }

        })

    }

    function showOnScreen(expense){
        
        const li=document.createElement('li')
                li.innerHTML=`${expense.amount} ${expense.description} ${expense.category}
                <button class="delete" onClick="deleteExpense(${expense.id},event)">Delete Product</button>`
                ul.appendChild(li)

    }

    function deleteExpense(id,e){
        const token=localStorage.getItem('token')
        axios.delete(`http://localhost:3000/expense/delete-expense/${id}`,{headers:{"Authorization":token}}).then((res)=>{
            console.log(res.data.message)
            const li=e.target.parentElement
            ul.removeChild(li)
        })
    }

    


    premiumButton.addEventListener('click',(e)=>{
        const token=localStorage.getItem('token')
        
        axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}}).then((res)=>{
            console.log(res)

            const options = {
                "key": res.data.key_id,
                "order_id": res.data.order.id,
                "handler": async function (response) {
                    try {
                        // Send the payment details to the server to update the transaction status
                       const res= await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                            orderId: options.order_id,
                            paymentId: response.razorpay_payment_id
                        }, { headers: { "Authorization": token } });
    
                        alert('you are premium user now')

                        premiumButton.style.display = "none";
                
                        premiumMessage.innerHTML = 'You Are a premium User';
                        localStorage.setItem('token',res.data.token)
                        showLeaderBoard()


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

    function showLeaderBoard(e){
        const button=document.createElement("button")
        button.textContent="Show Leaderboard"
        button.addEventListener('click',()=>{
            const showLeaderBoard=document.querySelector('#showLeaderboard')
            const errorMessage=document.querySelector('#expenseError')

        axios.get('http://localhost:3000/premium/showleaderboard').then((res)=>{
            showLeaderBoard.innerHTML=''

            const heading = document.createElement('h2');
            heading.innerHTML = 'Leaderboard';
            showLeaderBoard.appendChild(heading);
   
            for(let details of res.data){
                const li=document.createElement('li')
                li.innerHTML=`Name-${details.name} TotalExpenses-${details.totalExpenses}`
                showLeaderBoard.appendChild(li)
            }

        }).catch(err=>{
            errorMessage.innerHTML = err.message;

        })

        })
        document.querySelector('#Leaderboard').appendChild(button)


    }