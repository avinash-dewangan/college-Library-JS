console.log("this is index.js")

//Todos  
// 1 store the all data in local storage
// 2 book delete option
// 3 Add scroll display book


//prototype

//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constrcutor
function Display() {

}

//Add method to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI")
    let tablebody = document.getElementById("tablebody");
    let uiString = ` <tr>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
        </tr>`

    tablebody.innerHTML += uiString
}


//Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}



//Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false
    } else {
        return true;
    }
}


//Implement the show function
Display.prototype.show = function (type, msg) {
    let message = document.getElementById("message")
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
   <strong>Message:</strong> ${msg}
   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
 </div>`

    setTimeout(() => {
        message.innerHTML = ''
    }, 2000);
}



//Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFromSubmit);


function libraryFromSubmit(e) {
    e.preventDefault();
    console.log("you have submitted libarary form")

    let name = document.getElementById("bookName").value
    let author = document.getElementById("author").value
    let type;
    //software, management, media

    let software = document.getElementById("software")
    let management = document.getElementById("management")
    let media = document.getElementById("media")

    if (software.checked) {
        type = software.value
    } else if (management.checked) {
        type = management.value
    } else if (media.checked) {
        type = media.value
    }

    let book = new Book(name, author, type)


    //create display object
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", ' Your book has been successfully added!');
    } else {
        //show error to the user
        display.show('danger', ' Sorry you cannot add this book.')
    }

    console.log(book)

}

