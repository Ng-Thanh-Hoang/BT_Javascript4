export function stringToSlug(title) {
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase();
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}

export function resetForm() {
    dom("#taiKhoanNV").value = "";
    dom("#hoTen").value = "";
    dom("#email").value = "";
    dom("#matKhau").value = "";
    dom("#ngayLam").value = "";
    dom("#luongCB").value = "";
    dom("#chucVu").value = "";
    dom("#gioLam").value = "";

    dom("#taiKhoanNV").disabled = false;
    dom("#btnThemNV").disabled = false;
}

function dom(selector) {
    return document.querySelector(selector);
}

//======== Validation ========

// Hàm kiểm tra User
function validateUser() {
    let user = dom("#taiKhoanNV").value;
    let spanEl = dom("#tbTKNV");
    // Kiểm tra rỗng
    if (!user) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Tên tài khoản không được để trống"
        return false;
    }
    // Kiểm tra số lượng ký tự
    if (user.length < 4 || user.length > 6) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Tên tài khoản tối đa 4 - 6 ký số"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra tên nhân viên
function validateName() {
    let name = dom("#hoTen").value;
    let spanEl = dom("#tbTen");
    // Kiểm tra rỗng
    if (!name) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Tên nhân viên không được để trống"
        return false;
    }
    // Kiểm tra kiểu chữ
    let regex = /^[A-Za-z]/
    if (!regex.test(name)) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Tên nhân viên phải là chữ"
        return false
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra email
function validateEmail() {
    let email = dom("#email").value;
    let spanEl = dom("#tbEmail");
    // Kiểm tra rỗng
    if (!email) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Email không được để trống"
        return false;
    }
    // Kiểm tra email
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!regex.test(email)) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Email không đúng định dạng"
        return false
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra mật khẩu
function validatePassword() {
    let password = dom("#matKhau").value;
    let spanEl = dom("#tbMatKhau");
    // Kiểm tra rỗng
    if (!password) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Mật khẩu không được để trống"
        return false;
    }
    // Kiểm tra mật khẩu
    let regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,10})/
    if (!regex.test(password)) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)"
        return false
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra ngày làm
function validateNgayLam() {
    let date = dom("#ngayLam").value;
    let spanEl = dom("#tbNgay");
    // Kiểm tra rỗng
    if (!date) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Ngày tháng không được để trống"
        return false;
    }
    // Kiểm tra ngày tháng mm/dd/yyyy
    let regex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
    if (!regex.test(date)) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Ngày tháng theo định dạng mm/dd/yyyy"
        return false
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra lương cơ bản
function validateLuongCB() {
    let salary = dom("#luongCB").value;
    let spanEl = dom("#tbLuongCB");
    // Kiểm tra rỗng
    if (!salary) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Lương cơ bản không được để trống"
        return false;
    }
    // Kiểm tra lương cơ bản
    if (salary < 1e6 || salary > 2e7) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Lương cơ bản 1.000.000 - 20.000.000 VNĐ"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra chức vụ
function validateChucVu() {
    let regency = dom("#chucVu").value;
    let spanEl = dom("#tbChucVu");
    // Kiểm tra chức vụ
    if (!regency) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Chức vụ phải chọn hợp lệ, không được để trống"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

// Hàm kiểm tra giờ
function validateGioLam() {
    let hour = dom("#gioLam").value;
    let spanEl = dom("#tbGiolam");
    // Kiểm tra rỗng
    if (!hour) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = " Giờ làm việc không được để trống"
        return false;
    }
    // Kiểm tra lương cơ bản
    if (hour < 80 || hour > 200) {
        spanEl.style.display = "Block"
        spanEl.innerHTML = "Giờ làm (80-200 giờ)"
        return false;
    }
    spanEl.style.display = "none";
    spanEl.innerHTML = ""
    return true;
}

export function validateForm() {
    // Kĩ thuật Đặt cờ hiệu, mặc định ban đầu xem như form hợp lệ
    let isValid = true;
    isValid = validateUser() & validateName() & validateEmail() & validatePassword() & validateNgayLam() & validateLuongCB() & validateChucVu() & validateGioLam();

    if (!isValid) {
        //alert("Form không hợp lệ");
        return false;
    }
    return true;
}
