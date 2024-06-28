import { NhanVien } from "../models/NhanVien.js";
import { resetForm, stringToSlug, validateForm } from "../assets/util/method.js";
let arrNhanVien = [];

init();

function init() {
    
    arrNhanVien = JSON.parse(localStorage.getItem("arrNhanVien")) || [];
    arrNhanVien = arrNhanVien.map((arrNhanVien) => {
        return new NhanVien(
            arrNhanVien.taiKhoanNV,
            arrNhanVien.hoTen,
            arrNhanVien.email,
            arrNhanVien.matKhau,
            arrNhanVien.ngayLam,
            arrNhanVien.luongCB,
            arrNhanVien.chucVu,
            arrNhanVien.gioLam
        );
    });
    renderTableNhanVien(arrNhanVien);
}

document.querySelector('#btnThemNV').onclick = function () {
    let nv = new NhanVien();
    let arrInput = document.querySelectorAll('#frmNhanVien .form-control');
    for (let input of arrInput) {
        let id = input.id;
        let value = input.value;
        nv[id] = value;
    }

    let isValid = validateForm();
    if (!isValid) {
        return;
    }

    arrNhanVien.push(nv);
    localStorage.setItem("arrNhanVien", JSON.stringify(arrNhanVien));
    //console.log(arrNhanVien);
    renderTableNhanVien(arrNhanVien);
    resetForm();
}

window.deleteNhanVien = function(taiKhoanNV) {
    arrNhanVien = arrNhanVien.filter((arrNhanVien) => {
        return arrNhanVien.taiKhoanNV !== taiKhoanNV
    })
    localStorage.setItem("arrNhanVien", JSON.stringify(arrNhanVien));
    renderTableNhanVien(arrNhanVien); 
}

function renderTableNhanVien(arrNV) {//input là mảng  
    let htmlString = ''
    for (let nv of arrNV) {
        htmlString += `
        <tr>
            <td>${nv.taiKhoanNV}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong()}</td>
            <td>${nv.loaiNhanVien()}</td>
            <td>
                <button class='btn btn-primary mx-2' onclick="editNhanVien('${nv.taiKhoanNV}')" data-toggle="modal" data-target="#myModal">Edit</button>
                <button class='btn btn-danger mx-2' onclick="deleteNhanVien('${nv.taiKhoanNV}')">Delete</button>
            </td>
        </tr>
        `
    }
    document.querySelector('#tableDanhSach').innerHTML = htmlString;
    return htmlString;
}

function dom(selector) {
    return document.querySelector(selector);
}

window.editNhanVien = function (taiKhoanNV) {
    let member = arrNhanVien.find((nv) => {
        return nv.taiKhoanNV === taiKhoanNV;
    })

    if (!member) {
        return
    }

    dom("#taiKhoanNV").value = member.taiKhoanNV;
    dom("#hoTen").value = member.hoTen;
    dom("#email").value = member.email;
    dom("#matKhau").value = member.matKhau;
    dom("#ngayLam").value = member.ngayLam;
    dom("#luongCB").value = member.luongCB;
    dom("#chucVu").value = member.chucVu;
    dom("#gioLam").value = member.gioLam;

    dom("#taiKhoanNV").disabled = true;
    dom("#btnThemNV").disabled = true;
}

document.querySelector('#btnCapNhat').onclick = function (e) {
    let nvEdit = new NhanVien(taiKhoanNV,hoTen,email,matKhau,ngayLam,luongCB,chucVu,gioLam);
    let arrInput = document.querySelectorAll('#frmNhanVien .form-control');
    for (let input of arrInput) {
        let id = input.id;
        let value = input.value;
        nvEdit[id] = value
    }

    let isValid = validateForm();
    if (!isValid) {
        return;
    }

    console.log('svEdit', nvEdit);
    let nvTrongMang = arrNhanVien.find(nv => nv.hoTen === nvEdit.hoTen);
    if (nvTrongMang) {
        for (let key in nvTrongMang) {
            nvTrongMang[key] = nvEdit[key];
            localStorage.setItem("arrNhanVien", JSON.stringify(arrNhanVien));
        }
        renderTableNhanVien(arrNhanVien);
    }
    resetForm();
}

document.querySelector('#btnTimNV').onclick = function () {
    let tuKhoa = document.querySelector('#searchName').value;
    tuKhoa = stringToSlug(tuKhoa);
    let arrNVTimKiem = arrNhanVien.filter(nv => stringToSlug(nv.loaiNhanVien()).search(tuKhoa) !== -1);
    renderTableNhanVien(arrNVTimKiem);
}





