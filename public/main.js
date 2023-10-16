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

        
        // console.log(user)
    
        alert(res.data.message)
        const token=res.data.token
        localStorage.setItem('token',token)
        // window.location.href='expense.html'
        
       
         }).catch((err)=>{
        
            loginError.innerHTML = `Error: ${err.response.data.error}`
    
    
         })
    
       })
    
    }
    // for expenses
    if (window.location.href.includes('expense.html')) {
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
            axios.post('http://localhost:3000/expense/add-expenses',details).then((res)=>{
                getAllProducts()
    
            })
    
        })
        window.addEventListener('DOMContentLoaded',()=>{
            getAllProducts()
        })
    
        function getAllProducts(){
            ul.innerHTML=""
            axios.get('http://localhost:3000/expense/get-expenses').then((res)=>{
                console.log(res.data)
                for(let product of res.data){
                    showOnScreen(product)
                    
                }
    
            })
    
        }

        function showOnScreen(product){
            const li=document.createElement('li')
                    li.innerHTML=`${product.amount} ${product.description} ${product.category}
                    <button class="delete" onClick="deleteExpense(${product.id},event)">Delete Product</button>`
                    ul.appendChild(li)

        }
        function deleteExpense(id,e){
            axios.delete(`http://localhost:3000/expense/delete-expense/${id}`).then((res)=>{
                console.log(res.data.message)
                const li=e.target.parentElement
                ul.removeChild(li)
            })
        }

    
    }
    
    