// event listeners 
const view1 = document.getElementById('view1')
const view2 = document.getElementById('view2')
const view3 = document.getElementById('view3')
// console.log(view1) 
// console.log(view2)

view1.style.display = 'none'
view2.style.display = 'none'
view3.style.display = 'flex'


// const view = document.querySelector('#view2');
// console.log(view)

// const div = view.querySelector("div")
// const h2 = div.querySelector("h2")


//syntax : add eventListener(event, function, useCapture)

const doSomething = () => {
    alert ("doing something");
}


//CLICK 
// h2.addEventListener("click", doSomething, false);  //alert wil lshow up when clicking on the h2 element 
// h2.removeEventListener ("click", doSomething,false);  //removed the listener 

// h2.addEventListener("click", (event) => {
//     console.log(event.target) // h2 /My 2nd View h2 
//     event.target.textContent = "clicked"; //wil;l change the textg to clicked 
// })


//READY STATE CHANGE 
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("Ready Statge : complete"); //the page is loaded although it is not exactly the same as there are different stages of the pages loading 
        //we are ready to interact with the DOM 
        initApp();
    }
});


//INit APP (best practice) 
// const initApp = () => {
//     const view = document.querySelector('#view2');
//     console.log(view)
//     const div = view.querySelector("div")
//     console.log(div)
//     const h2 = div.querySelector("h2")
//     console.log(h2)


//     view.addEventListener("click", (event) => {
//         view.style.backgroundColor = "purple";
//     })
//     div.addEventListener("click", (event) => {
//         div.style.backgroundColor = "blue";
//      })
//     h2.addEventListener("click", (event) => {
//         event.target.textContent = "Clicked" ;
//     }) //the events bubbles up to the high DOM element //this is the default pattern (if click on h2, it will change the div and view colors
// };



// const initApp = () => {
//     const view = document.querySelector('#view2');
//     console.log(view)
//     const div = view.querySelector("div")
//     console.log(div)
//     const h2 = div.querySelector("h2")
//     console.log(h2)


//     view.addEventListener("click", (event) => {
//         // event.stopPropagation() / this wil lstop propagation from outward to inward 
//         view.style.backgroundColor = "purple";
//     }, true)
//     div.addEventListener("click", (event) => {
//         //event.stopPropagation() //will not propagate outwards
//         div.style.backgroundColor = "blue";
//         //event.target.style.backgroundColor = "blue"; //the result will be diffeent as it will target the text (not the div) 
//      }, true)
//     h2.addEventListener("click", (event) => {
//         //event.stopPropagation() //will not propagate outwards 
//         event.target.textContent = "Clicked" ;
//     }, true) // true : start from outter most and then go to inwards 
// }; 

//using propagation will change the 
//the outtward will not propagate to inward 
//bubbling : from inside to outsoide 
//out to the in : stopPropagation()

//SYNTAX : add eventListener(event, function, useCapture) 
//if UseCapture is set to true : works from the out to the innermost, propagating its way in 
//if there is another listerns, each of these will be called. 
//most of the time we want to stop the propagation, by using stopPropagation() 

//event.target IS DIFFERENT from the EventListener 


/**
//change the CSS Style by applying Classes according to listeners 
const initApp = () => {
    const view = document.querySelector('#view2');
    console.log(view)
    const div = view.querySelector("div")
    console.log(div)
    const h2 = div.querySelector("h2")
    console.log(h2)


    view.addEventListener("click", (event) => {
        // view.classList.add("purple");
        // view.classList.remove("darkblue") 
        view.classList.toggle("purple");
        view.classList.toggle("darkblue"); //toggle classes when clciking 
    }, false)
    div.addEventListener("click", (event) => {
        div.classList.toggle("blue");
        div.classList.toggle("black"); //changes collor but the text remains the same 

     }, false)
    h2.addEventListener("click", (event) => { //text 
        const myText = event.target.textContent;
         myText === "My 2nd View" 
         ? event.target.textContent = "Clicked"
         : event.target.textContent = "My 2nd View"
    }, false)  

    const nav = document.querySelector("nav");
    nav.addEventListener("mouseover", (event) => {
        event.target.classList.toggle("height100"); //when mousing over the nav, tghe nav will get wider 
       })

    nav.addEventListener("mouseout", (even) => {
        event.target.classList.remove("height100"); //the nav bar goes bacl to the original size 
    })
}; 

 */


//view3 Form 
const initApp= () => {
    const view3 = document.querySelector("#view3");
    const myForm = view3.querySelector("#myForm");
    myForm.addEventListener("submit", (event) => {
        event.preventDefault(); //IMPORTANT otherwise the text will diappera s 
        console.log("submit event"); //the text remains ion console.log
    })

}

