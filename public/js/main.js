let $notesList = $("#myNotes");
let $noteItem = $(".note-item");
let $newNote = $(".new-note");
var $submitBtn = $("#submit-btn");


var getAndRenderNotes = function () {
    $.ajax({
        url: "/api/notes",
        method: "GET"
    }).then(function (data) {
        var $listItems = [];

        // Loop through and build a list item for each quote returned from the db
        for (var i = 0; i < data.length; i++) {
            var note = data[i];
            // Using the jQuery `data` method, we can attach data to an element for later use

            console.log(note);
            let card = $('<div class="card note-item">').data(note);
            let cBody = $('<div class="card-body ">');
            let cTitle = $('<h5 class="card-title text-left">').text(note.title);


            card.append(cBody.append(cTitle));
            console.log(card);

            $listItems.push(card);
        }

        $notesList.empty();

        $notesList.append($listItems);
    });
};

getAndRenderNotes();

var seeNote = function () {
    // Getting a reference to the quote data stored on the list item earlier

    console.log('seeNote');
    console.log(this);
    let note = $(this).parents(".note-item").data();

    console.log(note);
};

const newNote = () => {
    console.log('new note');
    let $form = $('<form">');
    let $fGroupT = $('<div class="form-group text-left display-4">');
    let $fLabelT = $('<label for="formGroupExampleInput">').text('Note Title');
    let $fInputT = $('<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Note Title">');

    let $fGroupN = $('<div class="form-group text-left display-4">');
    let $fLabelN = $('<label for="formGroupExampleInput">').text('Note');
    let $fInputN = $('<input type="text" class="form-control" id="formGroupExampleInput" placeholder="Note">');

    let $fGroupB = $('<button type="submit" id="submit-btn" class="btn btn-primary add-note">').text('Save');
    $('#newNote').empty();
    $form.append(
        $fGroupT.append(
            $fLabelT.append($fInputT)
        ),
        $fGroupN.append(
            $fLabelN.append($fInputN)
        ),
        $fGroupB
    );
    $('#newNote').append($form);
    $submitBtn = $("#submit-btn");
};

const addNote = ()=>{
    event.preventDefault();
    console.log('ADD NOTE');
}

$submitBtn.on("click", addNote);
$notesList.on("click", ".note-item", seeNote);
$newNote.on("click", newNote);

