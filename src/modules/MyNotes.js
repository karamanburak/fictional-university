import $ from "jquery";

class MyNotes {
	constructor() {
		this.events();
	}

	events() {
		$("#my-notes").on("click", ".delete-note", this.deleteNote);
		$("#my-notes").on("click", ".edit-note", this.editNote.bind(this));
		$("#my-notes").on("click", ".update-note", this.updateNote.bind(this));
		$(".submit-note").on("click", this.createNote.bind(this));
	}

	// Methods will go here
	editNote(e) {
		let thisNote = $(e.target).parents("li");
		if (thisNote.data("state") == "editable") {
			this.makeNoteReadOnly(thisNote);
		} else {
			this.makeNoteEditable(thisNote);
		}
	}

	makeNoteEditable(thisNote) {
		thisNote
			.find(".edit-note")
			.html('<i clas="fa fa-times" aria-hidden="true"></i>Cancel');
		thisNote
			.find(".note-title-field, .note-body-field")
			.removeAttr("readonly")
			.addClass("note-active-field");
		thisNote.find(".update-note").addClass("update-note--visible");
		thisNote.data("state", "editable");
	}

	makeNoteReadOnly(thisNote) {
		thisNote
			.find(".edit-note")
			.html('<i clas="fa fa-pencil" aria-hidden="true"></i>Edit');
		thisNote
			.find(".note-title-field, .note-body-field")
			.attr("readonly", "readonly")
			.removeClass("note-active-field");
		thisNote.find(".update-note").removeClass("update-note--visible");
		thisNote.data("state", "cancel");
	}

	deleteNote(e) {
		let thisNote = $(e.target).parents("li");
		$.ajax({
			beforeSend: (xhr) => {
				xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
			},
			url:
				universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
			type: "DELETE",
			success: (response) => {
				thisNote.slideUp();
				console.log("Congrats..");
				console.log(response);
			},
			error: (response) => {
				console.log("sorry");
				console.log(response);
			},
		});
	}

	updateNote(e) {
		let thisNote = $(e.target).parents("li");

		let ourUpdatedPost = {
			title: thisNote.find(".note-title-field").val(),
			content: thisNote.find(".note-body-field").val(),
		};
		$.ajax({
			beforeSend: (xhr) => {
				xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
			},
			url:
				universityData.root_url + "/wp-json/wp/v2/note/" + thisNote.data("id"),
			type: "POST",
			data: ourUpdatedPost,
			success: (response) => {
				this.makeNoteReadOnly(thisNote);
				console.log("Congrats..");
				console.log(response);
			},
			error: (response) => {
				console.log("sorry");
				console.log(response);
			},
		});
	}

	createNote(e) {
		let ourNewPost = {
			title: $(".new-note-title").val(),
			content: $(".new-note-body").val(),
			status: "private",
		};
		$.ajax({
			beforeSend: (xhr) => {
				xhr.setRequestHeader("X-WP-Nonce", universityData.nonce);
			},
			url: universityData.root_url + "/wp-json/wp/v2/note/",
			type: "POST",
			data: ourNewPost,
			success: (response) => {
				$(".new-note-title, .new-note-body").val();
				$(`
				<li data-id="${response.id}">
                    <input readonly class="note-title-field" type="text" value="${response.title.raw}">
                    <span class="edit-note"><i clas="fa fa-pencil" aria-hidden="true"></i>Edit</span>
                    <span class="delete-note"><i clas="fa fa-trash-o" aria-hidden="true"></i>Delete</span>
                    <textarea readonly class="note-body-field">${response.content.raw}</textarea>
                    <span class="update-note btn btn--blue btn--small"><i clas="fa fa-arrow-right" aria-hidden="true"></i>Save</span>
                </li>
					`)
					.prependTo("#my-notes")
					.hide()
					.slideDown();

				console.log("Congrats..");
				console.log(response);
			},
			error: (response) => {
				console.log("sorry");
				console.log(response);
			},
		});
	}
}

export default MyNotes;