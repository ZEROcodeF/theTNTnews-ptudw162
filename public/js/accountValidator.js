
$(function () {
    $('.trim-text-change').on('focusout', function () {
        $(this).val($.trim($(this).val().replace(/\s\s+/g, ' ')));
    });
    $.validator.addMethod(
        "dateFormat",
        function (value, element) {
            return true;
        }
    );

    $('#txtBirthdate').datetimepicker({
        startDate: '2014/12/31',
        maxDate: '2015/01/01',
        format: 'd/m/Y',
        timepicker: false,
        mask: true,
    });

    $('#registerForm').validate({
        rules: {
            email: {
                required: true,
                email: true,
                maxlength: 50,
                remote: {
                    url: '/account/is-email-available'
                }
            },
            password: {
                required: true,
                minlength: 8
            },
            confirm: {
                required: true,
                equalTo: $('[name="password"]')
            },
            fullname: {
                required: true,
                maxlength: 50
            },
            pseudonym: {
                required: $('#checkboxWriter:checked'),
                maxlength: 50
            },
            birthdate: {
                required: true,
                dateFormat: true
            },
        },
        messages: {
            email: {
                required: 'Bạn cần phải nhập Email hợp lệ',
                maxlength: 'Email phải dưới 50 ký tự!',
                email: 'Phải nhập đúng định dạng Email!',
                remote: 'Email đã tồn tại, hãy chọn một email khác!'
            },
            password: {
                required: 'Bạn cần phải nhập mật khẩu hợp lệ',
                minlength: 'Mật khẩu phải ít nhất 8 ký tự!'
            },
            confirm: {
                required: 'Bạn cần phải nhập lại mật khẩu hợp lệ',
                equalTo: 'Nhập lại mật khẩu không trùng khớp.'
            },
            fullname: {
                required: 'Bạn cần phải nhập họ và tên hợp lệ',
                maxlength: 'Họ tên phải dưới 50 ký tự!'
            },
            pseudonym: {
                required: 'Bạn cần phải nhập bút danh hợp lệ',
                maxlength: 'Bút danh phải dưới 50 ký tự!'
            },
            birthdate: {
                required: 'Bạn cần phải nhập ngày tháng năm sinh hợp lệ',
                dateFormat: 'Ngày tháng năm sinh phải theo dạng DD/MM/YYYY'
            },
        },
        errorElement: 'small',
        errorClass: 'help-block text-danger',
        highlight: function (e) {
            $(e).removeClass('is-valid').addClass('is-invalid');
        },
        unhighlight: function (e) {
            $(e).removeClass('is-invalid').addClass('is-valid');
        }
    });
    $('#checkboxWriter').change(function () {
        if ($(this).is(':checked')) {
            $('#txtPseudonym').prop('disabled', false);
        } else {
            $('#txtPseudonym').prop('disabled', true);
        }
    });
})