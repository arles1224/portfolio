function copyrightRequest(a,b,d){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            if(d==1){
                copyNoticeArray(JSON.parse(this.response));
            }else if(d==2){
                copyMenuArray(JSON.parse(this.response));
            }
        }
    }
    xhr.open(a,b,true);
    xhr.send();
}
copyrightRequest("GET","./json/notice.json",1);
copyrightRequest("GET","./json/pullmenu.json",2);

//공지사항 HTML 출력
var copyNotice = document.getElementById("copyNotice");
var copyNoticeLi;
function copyNoticeArray(array) {
    array.notice.forEach(function(a1,a2,a3){
        copyNoticeLi = document.createElement("li");
        copyNoticeLi.textContent = a1;
        copyNotice.append(copyNoticeLi);
    });
}

//메뉴 HTML 출력
var copyMenuSpan, copyMenuEm, copyMenuUl, copyMenuLi;
var copyMenu = document.getElementById("copyMenu");
function copyMenuArray(array){
    // console.log(array);
    Object.keys(array[0]).forEach(function(a1,a2,a3){
        copyMenuSpan = document.createElement("span");
        copyMenuSpan.setAttribute("onclick","copyMenuMove("+a2+")");
        copyMenuEm = document.createElement("em")
        copyMenuUl = document.createElement("ul");
        copyMenuUl.id = "copyUl"+a2;
        if(a1 == "brand"){
            copyMenuSpan.textContent = "브랜드 바로가기";
        }else if(a1 == "subsidi"){
            copyMenuSpan.textContent = "계열사 바로가기"
        }
        copyMenuEm.textContent = "▼";
        copyMenu.appendChild(copyMenuSpan);
        copyMenuSpan.appendChild(copyMenuUl);
        copyMenuSpan.appendChild(copyMenuEm);
        array[0][a1].forEach(function(b1,b2,b3){
            copyMenuLi = document.createElement("li");
            copyMenuLi.textContent = b1;
            copyMenuUl.appendChild(copyMenuLi);
        });
    });
    
}

//공지사항 애니메이션 핸들링
var copyTop = 0;
var copyTimeout, copyLiClone;
function copyNoticeMove(){
    if(copyTop < 45){
        copyTop += 1
        copyNotice.style.top = -copyTop+"px";
        setTimeout(copyNoticeMove,20);
    }else if(copyTop >= 45){
        copyLiClone = copyNotice.firstElementChild.cloneNode(true);
        copyNotice.firstElementChild.remove();
        copyNotice.append(copyLiClone);
        copyNotice.style.top = 0;
        copyTop = 0;
        setTimeout(copyNoticeMove,10000);
    }
}
setTimeout(copyNoticeMove,10000);

//메뉴 애니메이션 핸들링
var copyUlId;
var copyMenuControl = true;
function copyMenuMove(no) {
    copyUlId = document.getElementById("copyUl"+no);
    if(copyMenuControl == true){
        copyUlId.style.border = "1px solid black";
        copyUlId.style.height = copyUlId.children.length * copyUlId.firstElementChild.offsetHeight + "px";
        copyMenuControl = false;
    }else{
        copyUlId.style.height = "0";
        copyMenuControl = true;
        setTimeout(border,900);
    }
}
function border(){
    copyUlId.style.border = 0;
}

//공정거래위원회 API 서버 동기화 함수
function corp(no) {
    window.open("http://www.ftc.go.kr/bizCommPop.do?wrkr_no="+no,"","width=600 height=600");
}