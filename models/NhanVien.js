export function NhanVien(taiKhoanNV,hoTen,email,matKhau,ngayLam,luongCB,chucVu,gioLam){
        this.taiKhoanNV = taiKhoanNV;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCB = luongCB;
        this.chucVu = chucVu;
        this.gioLam = gioLam;
        this.tongLuong = function(){
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
        this.loaiNhanVien = function(){
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
