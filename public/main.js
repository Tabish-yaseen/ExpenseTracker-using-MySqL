// for sign up
if (window.location.href.includes('signup.html')) {
    const signUpForm=document.querySelector('#signupform')
    const signUpErrordiv=document.querySelector('#signuperror')
    
    
    signUpForm.addEventListener('submit',(e)=>{
        e.preventDefault()
     const username=document.querySelector('.username')
    const useremail=document.querySelector('.useremail')
    const userpassword=document.querySelector('.userpassword')
    
    
    
        const details={
            name:username.value,
            email:useremail.value,
            password:userpassword.value
    
        }
        axios.post('http://localhost:3000/user/signup',details).then((res)=>{
            console.log("hurr",res)
    
            window.location.href = 'login.html';
            
            
        }).catch((err)=>{
            console.log(err)
            signUpErrordiv.innerHTML=err.message
        })
    })
    }
    
    // for login
    if (window.location.href.includes('login.html')) { 
        const loginForm=document.querySelector('#loginform')
        let loginError=document.querySelector('#loginerror')
    
       
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault()
       let email= document.querySelector('.loginemail')
       let password=document.querySelector('.loginpassword')
       const details={
        useremail:email.value,
        userpassword:password.value
       }
       
       axios.post("http://localhost:3000/user/login",details).then((res)=>{

        alert(res.data.message)
        const token=res.data.token
        const isPremium=res.data.isPremium
        localStorage.setItem('token',token)
        localStorage.setItem('isPremium',isPremium)
        window.location.href='expense.html'
        
       
         }).catch((err)=>{
        
            loginError.innerHTML = `Error: ${err.response.data.error}`
    
    
         })
    
       })
    
    }
    // for expenses
    if (window.location.href.includes('expense.html')) {

        const premiumButton=document.querySelector('#premium-button')
        const premiumMessage = document.querySelector('#premium-message');

        const isPremium=localStorage.getItem('isPremium')
        console.log("helloo",isPremium)
        if(isPremium==="true"){
            premiumButton.style.display = "none";        
             premiumMessage.style.display = "block";

        }

        const expenseForm=document.querySelector('#expenseform')
        const ul=document.querySelector('#show')
    
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
                            await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                                orderId: options.order_id,
                                paymentId: response.razorpay_payment_id
                            }, { headers: { "Authorization": token } });
        
                            
                            alert('you are premium user now')

                            premiumButton.style.display = "none";
                    
                           premiumMessage.style.display = "block";

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

    
    }
    
    