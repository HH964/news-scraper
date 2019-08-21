$(".scrape").on("click", () => {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .done((data) => {
            alert("scraped");
            window.location = "/articles"
        });
});

$(".save").on("click", () => {
    let = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/save/" + thisId
    })
        .done((data) => {
            alert("scraped n' saved");
            window.location.reload(true);
        });
});

$(".comment").on("submit", (event) => {
    let thisId = $("#commentid").val();
    let newComment = {
        title: $("#CommentTitle").val().trim(),
        body: $("#CommentBody").val().trim()
    };

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: newComment
    })
        .then((data) => {
            // console.log(data);
        });
});


$(".clear".on("click", () => {
    $.ajax({
        method: "GET",
        url: "/clear"
    })
        .done((data) => { });
    window.location = "/";
}));

$(".commenttrigger").on("click", () => {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then((data) => {
            $("CommentTitle").text(data.comment.title);
            $("CommentBody").text(data.comment.body)
        });
});

$('.delete').on('click', () => {
    let thisId = $(this).attr("data-id");
    $.ajax({
        method: 'POST',
        url: '/articles/delete/' + thisId
    }).done(function (data) { });
    window.location.reload(true);
});
