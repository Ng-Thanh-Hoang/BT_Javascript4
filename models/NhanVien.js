export class NhanVien {
    taiKhoanNV = '';
    hoTen = '';
    email = '';
    matKhau = '';
    ngayLam = '';
    luongCB = 0;
    chucVu = '';
    gioLam = '';
    tongLuong(){
        if (this.chucVu === 'Giám đốc') {
            return ((this.luongCB * 3).toLocaleString("vi-VN"));
        }
        else if (this.chucVu === 'Trưởng phòng') {
            return ((this.luongCB * 2).toLocaleString("vi-VN"));
        }
        else if (this.chucVu === 'Nhân viên') {
            return ((this.luongCB * 1).toLocaleString("vi-VN"));
        }
    };
    loaiNhanVien(){
        if (this.gioLam >= 192) {
            return 'Nhân viên xuất sắc';
        }
        else if (this.gioLam >= 176) {
            return 'Nhân viên giỏi';
        }
        else if (this.gioLam >= 160) {
            return 'Nhân viên khá';
        }
        else {
            return 'Nhân viên trung bình';
        }
    };
}
