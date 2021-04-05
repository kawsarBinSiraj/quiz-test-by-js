/**
 * @Script js for (Template/Project Name)
 *
 * @project     - Project Name
 * @author      - 
 * @created_by  - 
 * @created_at  - 
 * @modified_by -
 */


/**
 * ========================================================
 * this function execute when window properly loaded
 * ===========================================================
 */

$(window).on('load', function () {

    // code should be execute here

});



/**
 * ========================================================
 * this function execute when DOM element ready 
 * ===========================================================
 */

$(document).ready(function () {


    // get quiz title and status
    // output show by modal
    $(function () {
        let quiz = [];
        $('#quiz').on('click', '.btn-answer-submit', function (e) {
            e.preventDefault();
            let quizList = $(this).closest('.quiz-list');
            let title = quizList.find('.quiz-title').text() || 'Undefined';
            let submittedStatus = $(this).data().submit || 'Undefined';
            let userEmail = '';
            let userPassword = '';

            if (quizList.find('#user-email').length || quizList.find('#user-password').length) {
                userEmail = $('#user-email').val();
                userPassword = $('#user-password').val();
                if (userEmail === '' || userEmail === null || userPassword === '' || userPassword === null) {
                    return alert('Please fill up the all registration field first !!')
                } else {
                    if (userEmail == '' || userEmail.indexOf('@') == -1 || userEmail.indexOf('.') == -1) {
                        return alert('Please fill up email address using @ and write after some words like : example@email.com !')
                    }
                    title = '';
                    submittedStatus = '';
                    quiz.push({ userEmail, userPassword });
                    quizList.next().length ? quizList.removeClass('active').next().addClass('active') : null
                }
            } else {
                quiz.push({ title, submittedStatus });
                quizList.next().length ? quizList.removeClass('active').next().addClass('active') : null
            }
        });


        $('#quiz').on('click', '.btn-result-print', function (e) {
            e.preventDefault();
            let resultPrint = '';
            let userMail = '';
            const userMailArray = Array.isArray(quiz) && quiz.filter((item) => item.userEmail);
            userMailArray.map(item => userMail += item.userEmail);
            const withoutUserMail = Array.isArray(quiz) && quiz.filter((item) => !item.userEmail || !item.userPassword);
            Array.isArray(withoutUserMail) && withoutUserMail.map((item, index) => {
                resultPrint +=
                    `<li key=${index}>
                        <div class="quiz-text">${item.title}</div>
                        <div class="quiz-result">${item.submittedStatus.charAt(0).toUpperCase() + item.submittedStatus.slice(1)}</div>
                    </li>\n`
            });
            $('#result-print-out').append(resultPrint);
            $('#email-print').append(userMail);
            let resultModal = new bootstrap.Modal(document.getElementById('quiz-result'));
            resultModal.show();
        });

        document.getElementById('quiz-result').addEventListener('hidden.bs.modal', function () {
            $('#quiz .quiz-list').removeClass('active');
            $('#quiz .quiz-list').first().addClass('active');
            quiz = [];
        });

    });


});
