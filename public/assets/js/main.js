let $notesList = $("#myNotes");
let $noteItem = $(".note-item");
let $newNote = $(".new-note");
let $submitBtn = $("#submit-btn");
let $seeNote = $('#seeNote');
let $editNote = $('.editImg');



var getAndRenderNotes = function () {
    $.ajax({
        url: "/api/notes",
        method: "GET"
    }).then(function (data) {
        var $listItems = [];

        // Loop through and build a list item for each quote returned from the db
        for (var i = 0; i < data.length; i++) {
            var note = data[i];
            let card = $('<div class="card card-item">');
            let cBody = $('<div class="card-body note-item">').data(note);
            let cTitle = $('<h5 class="card-title text-left">').text(note.title);
            let cEdit = $('<div >')
                .append($('<img src="./assets/images/pen.png" alt="img" class="editImg">').on("click", editNote).data(note))
                .append($('<img src="./assets/images/trash.jpeg" alt="img" class="delImg">').on("click", delNote).data(note));
            


            card.append(cBody.append(cTitle), cEdit);
            $listItems.push(card);
        }

        $notesList.empty();

        $notesList.append($listItems);
    });
};


var seeNote = function () {
    // Getting a reference to the quote data stored on the list item earlier

    console.log('seeNote');

    let note = $(this).data();
    let card = $('<div class="card content">');
    let cBody = $('<div class="card-body">');
    let cTitle = $('<h2 class="card-title text-left">').text(note.title);
    let cCont = $('<p>').append($('<h4 class="card-text text-left">').text(note.note));

    cleanBoard();
    $seeNote.append(
        card.append(
            cBody.append(cTitle, $('<br>'), cCont)
        )
    );
};

const newNote = function () {
    console.log('new note');
    let $form = $('<form>');
    let $fGroupT = $('<div class="form-group text-left">');
    let $fLabelT = $('<label for="formGroupExampleInput">').text('Note Title');
    let $fInputT = $('<input type="text" class="form-control" id="fTitle" placeholder="Note Title">');

    let $fGroupN = $('<div class="form-group text-left">');
    let $fLabelN = $('<label for="formGroupExampleInput">').text('Note');
    let $fInputN = $('<textarea type="text" class="form-control" id="fNote" placeholder="Note">');

    let $fGroupB = $('<button type="submit" class="btn btn-primary add-note submit-btn">').text('Save');
    $fGroupB.on("click", addNote);
    cleanBoard();
    $form.append(
        $fGroupT.append($fLabelT, $fInputT),
        $fGroupN.append($fLabelN, $fInputN),
        $fGroupB
    );
    $('#newNote').append($form);

};

const addNote = function (event) {
    event.preventDefault();
    console.log('ADD NOTE');
    let fTitle = $('#fTitle').val();
    let fNote = $('#fNote').val();


    var note = {
        title: fTitle.trim(),
        note: fNote.trim()
    };

    $.ajax({
        url: "/api/notes",
        method: "POST",
        data: note
    })
        .then(function () {
            getAndRenderNotes();
            $('#newNote').empty();
            $seeNote.empty();
        });

}

const editNote = function (event) {
    event.preventDefault();
    console.log('EDIT NOTE');
    cleanBoard();

    let note = $(this).data();
    console.log(note);
    let card = $('<div class="card content">');
    let cBody = $('<div class="card-body">');
    let cForm = $('<form>').data(note);
    let cTitle = $('<input id="uTitle" class="form-control text-left">').val(note.title);
    let cCont = $('<textarea id="uNote" class="form-control text-left">').val(note.note);
    let fGroupB = $('<button type="submit" class="btn btn-primary add-note edit-btn">').text('Save');
    
    fGroupB.on("click", updateNote);
    $('#editNote').append(
        card.append(
            cBody.append(cForm.append(
                cTitle, $('<br>'), cCont, $('<br>'), fGroupB)
            )
        )
    );
}

const updateNote = function (event) {
    event.preventDefault();
    console.log('UPDATE NOTE');

    let fTitle = $('#uTitle').val();
    let fNote = $('#uNote').val();



    let note = $(this).parent().data();
    note.title = fTitle;
    note.note = fNote;
    delete note.note_date;

    $.ajax({
        url: "/api/notes/" + note.id,
        method: "PUT",
        data: note
    })
        .then(function () {
            cleanBoard();

            getAndRenderNotes();
        });

}

const delNote = function (event) {
    event.preventDefault();
    console.log('DELETE NOTE');
    console.log($(this).data());

    let note = $(this).data();

    $.ajax({
        url: `/api/notes/${note.id}`,
        method: "DELETE"
    })
        .then(function () {
            getAndRenderNotes();
        });

}

let cleanBoard = () => {
    $('#newNote').empty();
    $('#editNote').empty();
    $seeNote.empty();
}

getAndRenderNotes();

$notesList.on("click", ".note-item", seeNote);
$newNote.on("click", newNote);

