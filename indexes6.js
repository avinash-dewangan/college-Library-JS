console.log("this is es6 version of library project")

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI")
        let tablebody = document.getElementById("tablebody");
        let uiString = ` <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
            </tr>`

        tablebody.innerHTML += uiString
    }
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        } else {
            return true;
        }
    }

    //show
    show(type, msg) {
        let message = document.getElementById("message")
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
       <strong>${type === 'success' ? "Message" : "Error"}:</strong> ${msg}
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`

        setTimeout(() => {
            message.innerHTML = ''
        }, 5000);
    }
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

    //local storage
    let webObjLocal = localStorage.getItem("lib");
    let webObj = [];
    if (webObjLocal === null) {
        webObjLocal = []
    } else {
        webObj = JSON.parse(webObjLocal)
    }
    webObj.push(book)
    localStorage.setItem("lib", JSON.stringify(webObj))




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
