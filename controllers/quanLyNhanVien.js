import { NhanVien } from "../models/NhanVien.js";
import { stringToSlug } from "../assets/util/method.js";
let arrNhanVien = [];

document.querySelector('#btnThemNV').onclick = function(){
    let nv = new NhanVien();
    let arrInput = document.querySelectorAll('#frmNhanVien .form-control');
    for(let input of arrInput){
        let id = input.id;
        let value = input.value;
        nv[id] = value;
    }
    arrNhanVien.push(nv);
    //console.log(arrNhanVien);
    renderTableNhanVien(arrNhanVien);
    saveLocalStorage();
}

function renderTableNhanVien(arrNV){//input là mảng  
    let htmlString = ''
    for(let nv of arrNV) {
        htmlString +=`
        <tr>
            <td>${nv.taiKhoanNV}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong()}</td>
            <td>${nv.loaiNhanVien()}</td>
            <td>
                <button class='btn btn-primary mx-2' onclick="editNhanVien('${nv.hoTen}')" data-toggle="modal" data-target="#myModal">Edit</button>
                <button class='btn btn-danger mx-2' onclick="deleteNhanVien('${nv.hoTen}')">Delete</button>
            </td>
        </tr>
        `
    }
    document.querySelector('#tableDanhSach').innerHTML = htmlString;
    return htmlString;
}

window.deleteNhanVien = function(hoTenNV){
    let indexDel = arrNhanVien.findIndex(nv => nv.hoTen === hoTenNV);
    if(indexDel !== -1){
        arrNhanVien.splice(indexDel,1);
        console.log(arrNhanVien);
        renderTableNhanVien(arrNhanVien);
    }
}

window.editNhanVien = function(hoTenNV){
    let nvUpdate = arrNhanVien.find(nv => nv.hoTen === hoTenNV);
    if(nvUpdate){
        for(let key in nvUpdate){
            document.querySelectorAll(`#${key}`).value = nvUpdate[key];
        }
    }
}

document.querySelector('#btnCapNhat').onclick = function(e){
    let nvEdit = new NhanVien();
    let arrInput = document.querySelectorAll('#frmNhanVien .form-control');
    for(let input of arrInput){
        let id = input.id;
        let value = input.value;
        nvEdit[id] = value
    }
    console.log('svEdit',nvEdit);
    let nvTrongMang = arrNhanVien.find(nv => nv.hoTen === nvEdit.hoTen);
    if(nvTrongMang){
        for(let key in nvTrongMang){
            nvTrongMang[key] = nvEdit[key];
        }
        renderTableNhanVien(arrNhanVien);
    }
}

document.querySelector('#btnTimNV').onclick = function(){
    let tuKhoa = document.querySelector('#searchName').value;
    tuKhoa = stringToSlug(tuKhoa);
    let arrNVTimKiem = arrNhanVien.filter(nv => stringToSlug(nv.loaiNhanVien()).search(tuKhoa) !== -1);
    renderTableNhanVien(arrNVTimKiem);
}

window.saveLocalStorage = function(){
    let strNhanVien = JSON.stringify(arrNhanVien);
    localStorage.setItem('arrNhanVien', strNhanVien);
}

window.loadLocalStorage = function(){
    if(localStorage.getItem('arrNhanVien')){
        let strNhanVien = localStorage.getItem('arrNhanVien');
        arrNhanVien = JSON.parse(strNhanVien);
        renderTableNhanVien(arrNhanVien);
    }
}


