$(function () {
    let newsArr = [],
        News = function (text, type) {
            this.text = text;
            this.type = type;
        },
        reDrawTheNews = function () {
            let newsTable = $("#t2 tbody");
            newsTable.html('');
            $(newsArr).each(function (index) {
                newsTable.append(`<tr><td><input type="button" value="${this.text}" is="${index}" class="news ${this.type}" disabled></td><!--<td>${this.type}</td>--></td><td><input type="button" value="Delete" class="delete"></td><td><input type="button" value="Edit" class="edit"></td></tr>`)
            })
        },
        reDrawNewsSlider = function () {
            let newsMarquee = $('marquee');
            newsMarquee.html('');
            $(newsArr).each(function () {
                newsMarquee.append('&nbsp;&nbsp;&nbsp;&nbsp;' + this.text + '&nbsp;&nbsp;&nbsp;&nbsp;')
            })
        }

    $("#content").on('keydown', function (event) {
        if (event.keyCode === 13) {
            $('#addButton').trigger('click')
        }
    });

    $("#addButton").on("click", function () {
        let dateTable = $("#t2"),
            newNews = $("#content");
        if (newNews.val()) {
            let currentInput = $(':input:checked').eq(0);
            newsArr.push(new News(newNews.val(), currentInput.hasClass('sport') ? 'Sport' : currentInput.hasClass('social') ? 'Social' : 'Political'));
            if (dateTable.css('display') === 'none') dateTable.css('display', 'table');
            newNews.val("");
            newNews.focus();
            reDrawTheNews();
            reDrawNewsSlider();
        }
    });

    $("#filter").on('keyup', function () {
        let filter = $(this);
        if (filter.val()) {
            $('#t2 tbody tr td input.news').each(function () {
                if ($(this).val().toLowerCase().indexOf(filter.val().toLowerCase()) >= 0) {
                    $(this).parents('tr').css('display', '')
                } else {
                    $(this).parents('tr').css('display', 'none')
                }
            })
        } else {
            $('#t2 tbody tr').css('display', '')
        }
    });

    $('#t2').on('click', function (event) {
        let clicked = $(event.target),
            button = clicked.parents('tr').children(':first').children();
        if (clicked.hasClass('delete')) {
            newsArr.splice(parseInt(button.attr('is')), 1);
            reDrawTheNews();
            reDrawNewsSlider();
            if ($('#t2 tbody tr').length === 0) $('#t2').css('display', 'none');
        } else if (clicked.hasClass('edit')) {
            clicked.removeClass('edit').addClass('save').val('Save');
            button.attr({ type: 'text', disabled: false });
        } else if (clicked.hasClass('save')) {
            newsArr[parseInt(button.attr('is'))].text = button.val();
            reDrawNewsSlider();
            clicked.removeClass('save').addClass('edit').val('Edit');
            button.attr({ type: 'button', disabled: true });
        }
    })
});