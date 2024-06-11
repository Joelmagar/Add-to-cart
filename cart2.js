import{getDatabase , ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import{initializeApp}from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
const  addButtonEl=document.getElementById('addtocart')
const inputFieldEl=document.getElementById('input')
const appSettings = {
    databaseURL: "https://newprjt-7f0ed-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const list1= document.getElementById('list')
const app=initializeApp(appSettings)
// console.log("app",app)
const database=getDatabase(app)
// console.log("database",database)
const itemsinDB=ref(database,"shoppinglists")


addButtonEl.addEventListener("click", function(){
let inputvalue=inputFieldEl.value

push(itemsinDB,inputvalue)
clear()
// append(inputvalue)

})
onValue(itemsinDB,function(snapshot){
    if(snapshot.exists()){
        let array=Object.entries(snapshot.val())
        clearlist()
        for(let i=0; i<array.length; i++)
            {
                let fello=array[i]
                let currentitemId=fello[0]
                let currentitemValue=fello[1]
                append(fello)
            }

    }
    else{
        list1.innerHTML=" No items yet"
    }
   
})
function clear(){
     inputFieldEl.value=" "
}
function clearlist(){
    list1.innerHTML=""
 }
function append(item){
    let itemId=item[0]
    let itemValue=item[1]
   
    // list1.innerHTML +=`<li> ${inputvalue} </li>`
    let newEl=document.createElement('li')
    newEl.textContent=itemValue
    list1.append(newEl)
    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB=ref(database,`shoppinglists/${itemId}`)
        remove(exactLocationOfItemInDB)
        // console.log(exactLocationOfItemInDB)
    })
 }
