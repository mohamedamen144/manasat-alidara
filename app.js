// =========================
// تسجيل الدخول
// =========================

function login(){

    let user =
    document.getElementById(
        "username"
    )?.value.trim();

    let pass =
    document.getElementById(
        "password"
    )?.value.trim();

    // الحساب الرئيسي الثابت

    if(

        user === "mohamedamen" &&

        pass === "123456"

    ){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(

            "currentUser",

            JSON.stringify({

                code:
                "MASTER",

                fullName:
                "محمد أمين",

                userName:
                "mohamedamen",

                province:
                "جميع المحافظات",

                status:
                "فعال",

                isMaster:
                true

            })

        );

        window.location.href =
        "dashboard.html";

        return;

    }

    let remember =
    document.getElementById(
        "rememberMe"
    );

    let users =
    JSON.parse(
        localStorage.getItem(
            "users"
        )
    ) || [];

    let currentUser =

    users.find(

        u =>

        u.userName === user &&

        u.password === pass &&

        u.status === "فعال"

    );

    if(currentUser){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(

            "currentUser",

            JSON.stringify(
                currentUser
            )

        );

        if(

            remember &&

            remember.checked

        ){

            localStorage.setItem(
                "savedUser",
                user
            );

            localStorage.setItem(
                "savedPass",
                pass
            );

        }else{

            localStorage.removeItem(
                "savedUser"
            );

            localStorage.removeItem(
                "savedPass"
            );

        }

        window.location.href =
        "dashboard.html";

    }else{

        let msg =
        document.getElementById(
            "msg"
        );

        if(msg){

            msg.innerText =

            "اسم المستخدم أو كلمة المرور غير صحيحة";

        }

    }

}


// =========================
// استرجاع بيانات الدخول
// =========================

window.addEventListener(
"load",
function(){

    let userField =
    document.getElementById(
        "username"
    );

    let passField =
    document.getElementById(
        "password"
    );

    let remember =
    document.getElementById(
        "rememberMe"
    );

    if(
        !userField ||
        !passField ||
        !remember
    ){
        return;
    }

    let savedUser =
    localStorage.getItem(
        "savedUser"
    );

    let savedPass =
    localStorage.getItem(
        "savedPass"
    );

    if(
        savedUser &&
        savedPass
    ){

        userField.value =
        savedUser;

        passField.value =
        savedPass;

        remember.checked =
        true;

    }

});


// =========================
// Enter لتسجيل الدخول
// =========================

document.addEventListener(
"DOMContentLoaded",
function(){

    let username =
    document.getElementById(
        "username"
    );

    let password =
    document.getElementById(
        "password"
    );

    if(
        !username ||
        !password
    ){
        return;
    }

    username.addEventListener(
    "keydown",
    function(e){

        if(
            e.key === "Enter"
        ){

            e.preventDefault();

            password.focus();

        }

    });

    password.addEventListener(
    "keydown",
    function(e){

        if(
            e.key === "Enter"
        ){

            e.preventDefault();

            login();

        }

    });

});


// =========================
// تسجيل الخروج
// =========================

function logout(){

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "login.html";

}
// =========================
// التبويبات
// =========================

document.addEventListener(
"DOMContentLoaded",
function(){

    const companiesTab =
    document.getElementById(
        "companiesTab"
    );

    const productsTab =
    document.getElementById(
        "productsTab"
    );

    const generalOffersTab =
    document.getElementById(
        "generalOffersTab"
    );

    const specialOffersTab =
    document.getElementById(
        "specialOffersTab"
    );

    const companiesSection =
    document.getElementById(
        "companiesSection"
    );

    const productsSection =
    document.getElementById(
        "productsSection"
    );

    const generalOffersSection =
    document.getElementById(
        "generalOffersSection"
    );

    const specialOffersSection =
    document.getElementById(
        "specialOffersSection"
    );

    if(

        !companiesTab ||

        !productsTab ||

        !generalOffersTab ||

        !specialOffersTab

    ){

        return;

    }

    function hideAllSections(){

        companiesSection.style.display =
        "none";

        productsSection.style.display =
        "none";

        generalOffersSection.style.display =
        "none";

        specialOffersSection.style.display =
        "none";

        companiesTab.classList.remove(
            "active-tab"
        );

        productsTab.classList.remove(
            "active-tab"
        );

        generalOffersTab.classList.remove(
            "active-tab"
        );

        specialOffersTab.classList.remove(
            "active-tab"
        );

    }

    companiesTab.onclick = () => {

        hideAllSections();

        companiesSection.style.display =
        "block";

        companiesTab.classList.add(
            "active-tab"
        );

    };

    productsTab.onclick = () => {

        hideAllSections();

        productsSection.style.display =
        "block";

        productsTab.classList.add(
            "active-tab"
        );

    };

    generalOffersTab.onclick = () => {

        hideAllSections();

        generalOffersSection.style.display =
        "block";

        generalOffersTab.classList.add(
            "active-tab"
        );

    };

    specialOffersTab.onclick = () => {

        hideAllSections();

        specialOffersSection.style.display =
        "block";

        specialOffersTab.classList.add(
            "active-tab"
        );

    };

});


// =========================
// الشركات
// =========================

let companies =
JSON.parse(
    localStorage.getItem(
        "companies"
    )
) || [];


// =========================
// توليد كود الشركة
// =========================

function generateCompanyCode(){

    let maxNumber = 0;

    companies.forEach(company=>{

        let num = parseInt(

            company.code.replace(
                "CO",
                ""
            )

        );

        if(num > maxNumber){

            maxNumber = num;

        }

    });

    document.getElementById(
        "companyCode"
    ).value =

    "CO" +

    String(
        maxNumber + 1
    ).padStart(6,"0");

}


// =========================
// حفظ الشركة
// =========================

function saveCompany(){

    let code =
    document.getElementById(
        "companyCode"
    ).value;

    let name =
    document.getElementById(
        "companyName"
    ).value.trim();

    let origin =
    document.getElementById(
        "companyOrigin"
    ).value.trim();

    if(name === ""){

        alert(
            "يرجى إدخال اسم الشركة"
        );

        return;

    }

    if(origin === ""){

        alert(
            "يرجى اختيار منشأ الشركة"
        );

        return;

    }

    let existingIndex =

    companies.findIndex(

        c =>

        c.name
        .toLowerCase() ===

        name
        .toLowerCase()

    );

    if(existingIndex > -1){

        companies[existingIndex].name =
        name;

        companies[existingIndex].origin =
        origin;

        document.getElementById(
            "companyResult"
        ).innerHTML =

        `
        <div style="
        margin-top:10px;
        color:#0d6efd;
        font-weight:bold;
        ">
        ✏️ تم تعديل الشركة بنجاح
        </div>
        `;

    }else{

        companies.push({

            code: code,

            name: name,

            origin: origin

        });

        document.getElementById(
            "companyResult"
        ).innerHTML =

        `
        <div style="margin-top:10px">

        <b style="
        color:#0d6efd;
        font-size:16px;
        ">
        ✅ تمت إضافة الشركة بنجاح
        </b>

        <table style="
        width:100%;
        margin-top:10px;
        border-collapse:collapse;
        text-align:center;
        border:1px solid #dbe5f1;
        ">

        <tr style="
        background:#0d6efd;
        color:white;
        ">

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        كود الشركة
        </th>

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        اسم الشركة
        </th>

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        🌍 منشأ الشركة
        </th>

        </tr>

        <tr>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${code}
        </td>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${name}
        </td>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${origin}
        </td>

        </tr>

        </table>

        </div>
        `;

    }

    localStorage.setItem(

        "companies",

        JSON.stringify(
            companies
        )

    );

    document.getElementById(
        "companyName"
    ).value = "";

    document.getElementById(
        "companyOrigin"
    ).value = "";

    generateCompanyCode();

}


// =========================
// استدعاء الشركة
// =========================

document
.getElementById("companyName")
?.addEventListener(
"input",
function(){

    let name =
    this.value.trim();

    if(name === "")
    return;

    let company =

    companies.find(

        c =>

        c.name
        .toLowerCase() ===

        name
        .toLowerCase()

    );

    if(company){

        document.getElementById(
            "companyCode"
        ).value =

        company.code;

        document.getElementById(
            "companyResult"
        ).innerHTML =

        "✏️ تم استدعاء الشركة للتعديل";

    }

});


// =========================
// زر الحفظ
// =========================

document.addEventListener(
"click",
(e)=>{

    if(

        e.target.id ===
        "saveCompanyBtn"

    ){

        saveCompany();

    }

});


// =========================
// بدء الصفحة
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    if(

        document.getElementById(
            "companyCode"
        )

    ){

        generateCompanyCode();

    }

});

// =========================
// المنتجات
// =========================

let products =
JSON.parse(
    localStorage.getItem(
        "products"
    )
) || [];


// =========================
// توليد كود المنتج
// =========================

function generateProductCode(){

    let maxNumber = 0;

    products.forEach(product=>{

        let num = parseInt(

            product.code.replace(
                "PR",
                ""
            )

        );

        if(num > maxNumber){

            maxNumber = num;

        }

    });

    document.getElementById(
        "productCode"
    ).value =

    "PR" +

    String(
        maxNumber + 1
    ).padStart(6,"0");

}


// =========================
// حفظ المنتج
// =========================

function saveProduct(){

    let code =
    document.getElementById(
        "productCode"
    ).value;

    let name =
    document.getElementById(
        "productName"
    ).value.trim();

    let scientific =
    document.getElementById(
        "scientificName"
    ).value.trim();

    let company =
    document.getElementById(
        "companySelect"
    ).value.trim();

    let form =
    document.getElementById(
        "dosageForm"
    ).value;

    if(

        name === "" ||

        scientific === "" ||

        company === "" ||

        form === ""

    ){

        alert(
            "يرجى إكمال البيانات"
        );

        return;

    }


    // التحقق من وجود الشركة

    let companyExists =

    companies.some(

        c =>

        c.name
        .toLowerCase() ===

        company
        .toLowerCase()

    );

    if(!companyExists){

        let result = confirm(
            "الشركة غير مسجلة\nهل تريد إضافتها الآن ؟"
        );

        if(result){

            document.getElementById(
                "quickCompanyCode"
            ).value =

            "CO" +

            String(
                companies.length + 1
            ).padStart(6,"0");

            document.getElementById(
                "quickCompanyName"
            ).value =

            company;

            document.getElementById(
                "quickCompanyModal"
            ).style.display =

            "block";

        }

        return;

    }


    let existingIndex =

    products.findIndex(

        p =>

        p.name
        .toLowerCase() ===

        name
        .toLowerCase()

    );

    let productData = {

        code:
        code,

        name:
        name,

        scientific:
        scientific,

        company:
        company,

        form:
        form

    };

    if(existingIndex > -1){

        products[existingIndex] =
        productData;

        document.getElementById(
            "productResult"
        ).innerHTML =

        "✏️ تم تعديل المنتج بنجاح";

    }else{

        products.push(
            productData
        );

        document.getElementById(
            "productResult"
        ).innerHTML =

        `
        <div style="margin-top:10px">

        <b style="
        color:#0d6efd;
        font-size:16px;
        ">
        ✅ تمت إضافة المنتج بنجاح
        </b>

        <table style="
        width:100%;
        margin-top:10px;
        border-collapse:collapse;
        text-align:center;
        border:1px solid #dbe5f1;
        ">

        <tr style="
        background:#0d6efd;
        color:white;
        ">

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        الكود
        </th>

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        المنتج
        </th>

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        الاسم العلمي
        </th>

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        الشركة
        </th>

        <th style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        الشكل
        </th>

        </tr>

        <tr>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${code}
        </td>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${name}
        </td>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${scientific}
        </td>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${company}
        </td>

        <td style="
        padding:10px;
        border:1px solid #dbe5f1;
        ">
        ${form}
        </td>

        </tr>

        </table>

        </div>
        `;

    }

    localStorage.setItem(

        "products",

        JSON.stringify(
            products
        )

    );

    document.getElementById(
        "productName"
    ).value = "";

    document.getElementById(
        "scientificName"
    ).value = "";

    document.getElementById(
        "companySelect"
    ).value = "";

    document.getElementById(
        "dosageForm"
    ).value = "";

    generateProductCode();

}


// =========================
// استدعاء المنتج
// =========================

document
.getElementById("productName")
?.addEventListener(
"input",
function(){

    let name =
    this.value.trim();

    if(name === "")
    return;

    let product =

    products.find(

        p =>

        p.name
        .toLowerCase() ===

        name
        .toLowerCase()

    );

    if(product){

        document.getElementById(
            "productCode"
        ).value =
        product.code;

        document.getElementById(
            "scientificName"
        ).value =
        product.scientific;

        document.getElementById(
            "companySelect"
        ).value =
        product.company;

        document.getElementById(
            "dosageForm"
        ).value =
        product.form;

        document.getElementById(
            "productResult"
        ).innerHTML =

        "✏️ تم استدعاء المنتج للتعديل";

    }

});


// =========================
// زر الحفظ
// =========================

document.addEventListener(
"click",
(e)=>{

    if(

        e.target.id ===
        "saveProductBtn"

    ){

        saveProduct();

    }

});


// =========================
// بدء الصفحة
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    if(

        document.getElementById(
            "productCode"
        )

    ){

        generateProductCode();

    }

});// =========================
// اقتراحات الشركات
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    let companyInput =
    document.getElementById(
        "companyName"
    );

    let suggestionsBox =
    document.getElementById(
        "companySuggestions"
    );

    if(
        !companyInput ||
        !suggestionsBox
    ){
        return;
    }

    companyInput.addEventListener(
    "input",
    ()=>{

        let value =

        companyInput.value
        .trim()
        .toLowerCase();

        suggestionsBox.innerHTML = "";

        if(value === ""){

            suggestionsBox.style.display =
            "none";

            return;

        }

        let matches =

        companies.filter(

            company =>

            company.name
            .toLowerCase()
            .includes(value)

        );

        if(matches.length === 0){

            suggestionsBox.style.display =
            "none";

            return;

        }

        matches.forEach(company=>{

            let item =
            document.createElement(
                "div"
            );

            item.className =
            "suggestion-item";

            item.textContent =
            company.name;

            item.onclick = ()=>{

                companyInput.value =
                company.name;

                document.getElementById(
                    "companyCode"
                ).value =

                company.code;

                document.getElementById(
                    "companyResult"
                ).innerHTML =

                "✏️ تم استدعاء الشركة للتعديل";

                suggestionsBox.style.display =
                "none";

            };

            suggestionsBox.appendChild(
                item
            );

        });

        suggestionsBox.style.display =
        "block";

    });

    document.addEventListener(
    "click",
    (e)=>{

        if(

            e.target !== companyInput &&

            !suggestionsBox.contains(
                e.target
            )

        ){

            suggestionsBox.style.display =
            "none";

        }

    });

});// =========================
// إضافة شركة سريعة
// =========================

document.addEventListener(
"click",
(e)=>{

    if(

        e.target.id ===
        "saveQuickCompanyBtn"

    ){

        let code =
        document.getElementById(
            "quickCompanyCode"
        ).value;

        let name =
        document.getElementById(
            "quickCompanyName"
        ).value.trim();

        if(name === ""){

            alert(
                "يرجى إدخال اسم الشركة"
            );

            return;

        }

        let exists =

        companies.some(

            c =>

            c.name
            .toLowerCase() ===

            name
            .toLowerCase()

        );

        if(exists){

            alert(
                "الشركة موجودة مسبقاً"
            );

            return;

        }

        companies.push({

            code: code,

            name: name

        });

        localStorage.setItem(

            "companies",

            JSON.stringify(
                companies
            )

        );

        document.getElementById(
            "companySelect"
        ).value =

        name;

        document.getElementById(
            "quickCompanyName"
        ).value = "";

        document.getElementById(
            "quickCompanyModal"
        ).style.display =

        "none";

        alert(
            "تمت إضافة الشركة بنجاح"
        );

    }

});
// =========================
// اقتراحات الشركات داخل المنتجات
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    let companyField =
    document.getElementById(
        "companySelect"
    );

    let suggestionsBox =
    document.getElementById(
        "companyProductSuggestions"
    );

    if(
        !companyField ||
        !suggestionsBox
    ){
        return;
    }

    companyField.addEventListener(
    "input",
    ()=>{

        let value =

        companyField.value
        .trim()
        .toLowerCase();

        suggestionsBox.innerHTML = "";

        if(value === ""){

            suggestionsBox.style.display =
            "none";

            return;

        }

        let matches =

        companies.filter(

            company =>

            company.name
            .toLowerCase()
            .includes(value)

        );

        if(matches.length === 0){

            suggestionsBox.style.display =
            "none";

            return;

        }

        matches.forEach(company=>{

            let item =
            document.createElement(
                "div"
            );

            item.className =
            "suggestion-item";

            item.textContent =
            company.name;

            item.onclick = ()=>{

                companyField.value =
                company.name;

                suggestionsBox.style.display =
                "none";

            };

            suggestionsBox.appendChild(
                item
            );

        });

        suggestionsBox.style.display =
        "block";

    });

    document.addEventListener(
    "click",
    (e)=>{

        if(

            e.target !== companyField &&

            !suggestionsBox.contains(
                e.target
            )

        ){

            suggestionsBox.style.display =
            "none";

        }

    });

});
// =========================
// اقتراحات المنتجات
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    let productInput =
    document.getElementById(
        "productName"
    );

    let suggestionsBox =
    document.getElementById(
        "productSuggestions"
    );

    if(
        !productInput ||
        !suggestionsBox
    ){
        return;
    }

    productInput.addEventListener(
    "input",
    ()=>{

        let value =

        productInput.value
        .trim()
        .toLowerCase();

        suggestionsBox.innerHTML = "";

        if(value === ""){

            suggestionsBox.style.display =
            "none";

            return;

        }

        let matches =

        products.filter(

            product =>

            product.name
            .toLowerCase()
            .includes(value)

        );

        if(matches.length === 0){

            suggestionsBox.style.display =
            "none";

            return;

        }

        matches.forEach(product=>{

            let item =
            document.createElement(
                "div"
            );

            item.className =
            "suggestion-item";

            item.textContent =
            product.name;

            item.onclick = ()=>{

                document.getElementById(
                    "productCode"
                ).value =
                product.code;

                document.getElementById(
                    "productName"
                ).value =
                product.name;

                document.getElementById(
                    "scientificName"
                ).value =
                product.scientific;

                document.getElementById(
                    "companySelect"
                ).value =
                product.company;

                document.getElementById(
                    "dosageForm"
                ).value =
                product.form;

                document.getElementById(
                    "productResult"
                ).innerHTML =

                "✏️ تم استدعاء المنتج للتعديل";

                suggestionsBox.innerHTML =
                "";

                suggestionsBox.style.display =
                "none";

            };

            suggestionsBox.appendChild(
                item
            );

        });

        suggestionsBox.style.display =
        "block";

    });

    document.addEventListener(
    "click",
    (e)=>{

        if(

            e.target !== productInput &&

            !suggestionsBox.contains(
                e.target
            )

        ){

            suggestionsBox.style.display =
            "none";

        }

    });

});// =========================
// أزرار Excel
// =========================

document.addEventListener(
"click",
(e)=>{

    // استيراد الشركات

    if(
        e.target.id ===
        "importCompaniesBtn"
    ){

        document
        .getElementById(
            "companiesExcelFile"
        )
        ?.click();

    }

    // استيراد المنتجات

    if(
        e.target.id ===
        "importProductsBtn"
    ){

        document
        .getElementById(
            "productsExcelFile"
        )
        ?.click();

    }

    // تصدير الشركات

    if(
        e.target.id ===
        "exportCompaniesBtn"
    ){

        let data =

        companies.map(c => ({

            "كود الشركة":
            c.code,

            "اسم الشركة":
            c.name

        }));

        let ws =
        XLSX.utils
        .json_to_sheet(data);

        let wb =
        XLSX.utils
        .book_new();

        XLSX.utils
        .book_append_sheet(

            wb,

            ws,

            "Companies"

        );

        XLSX.writeFile(

            wb,

            "Companies.xlsx"

        );

    }

    // تصدير المنتجات

    if(
        e.target.id ===
        "exportProductsBtn"
    ){

        let data =

        products.map(p => ({

            "كود المنتج":
            p.code,

            "اسم المنتج":
            p.name,

            "الاسم العلمي":
            p.scientific,

            "الشركة":
            p.company,

            "الشكل الصيدلاني":
            p.form

        }));

        let ws =
        XLSX.utils
        .json_to_sheet(data);

        let wb =
        XLSX.utils
        .book_new();

        XLSX.utils
        .book_append_sheet(

            wb,

            ws,

            "Products"

        );

        XLSX.writeFile(

            wb,

            "Products.xlsx"

        );

    }

});// =========================
// استيراد شركات Excel
// =========================

document
.getElementById("companiesExcelFile")
?.addEventListener(
"change",
function(e){

    let file =
    e.target.files[0];

    if(!file) return;

    let reader =
    new FileReader();

    reader.onload =
    function(event){

        let data =
        new Uint8Array(
            event.target.result
        );

        let workbook =
        XLSX.read(
            data,
            {
                type:"array"
            }
        );

        let sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

        let rows =
        XLSX.utils
        .sheet_to_json(
            sheet
        );

        let importedCount = 0;

        rows.forEach(row=>{

            let name =
            String(
                row["اسم الشركة"] || ""
            ).trim();

            if(name === "")
            return;

            let exists =

            companies.some(

                c =>

                c.name
                .toLowerCase() ===

                name
                .toLowerCase()

            );

            if(!exists){

                let maxNumber = 0;

                companies.forEach(company=>{

                    let num =
                    parseInt(

                        company.code
                        .replace(
                            "CO",
                            ""
                        )

                    );

                    if(
                        num >
                        maxNumber
                    ){

                        maxNumber =
                        num;

                    }

                });

                companies.push({

                    code:
                    "CO" +

                    String(
                        maxNumber + 1
                    ).padStart(
                        6,
                        "0"
                    ),

                    name:
                    name

                });

                importedCount++;

            }

        });

        localStorage.setItem(

            "companies",

            JSON.stringify(
                companies
            )

        );

        alert(

            "تم استيراد " +

            importedCount +

            " شركة بنجاح"

        );

        generateCompanyCode();

    };

    reader.readAsArrayBuffer(
        file
    );

});// =========================
// استيراد منتجات Excel
// =========================

document
.getElementById("productsExcelFile")
?.addEventListener(
"change",
function(e){

    let file =
    e.target.files[0];

    if(!file) return;

    let reader =
    new FileReader();

    reader.onload =
    function(event){

        let data =
        new Uint8Array(
            event.target.result
        );

        let workbook =
        XLSX.read(
            data,
            {
                type:"array"
            }
        );

        let sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

        let rows =
        XLSX.utils
        .sheet_to_json(
            sheet
        );

        let importedCount = 0;

        rows.forEach(row=>{

            let name =
            String(
                row["اسم المنتج"] || ""
            ).trim();

            if(name === "")
            return;

            let exists =

            products.some(

                p =>

                p.name
                .toLowerCase() ===

                name
                .toLowerCase()

            );

            if(!exists){

                let maxNumber = 0;

                products.forEach(product=>{

                    let num =
                    parseInt(

                        product.code
                        .replace(
                            "PR",
                            ""
                        )

                    );

                    if(
                        num >
                        maxNumber
                    ){

                        maxNumber =
                        num;

                    }

                });

                products.push({

                    code:
                    "PR" +

                    String(
                        maxNumber + 1
                    ).padStart(
                        6,
                        "0"
                    ),

                    name:
                    name,

                    scientific:
                    row["الاسم العلمي"] || "",

                    company:
                    row["الشركة"] || "",

                    form:
                    row["الشكل الصيدلاني"] || ""

                });

                importedCount++;

            }

        });

        localStorage.setItem(

            "products",

            JSON.stringify(
                products
            )

        );

        alert(

            "تم استيراد " +

            importedCount +

            " منتج بنجاح"

        );

        generateProductCode();

    };

    reader.readAsArrayBuffer(
        file
    );

});// =========================
// العروض
// =========================

let productOffers =
JSON.parse(
    localStorage.getItem(
        "productOffers"
    )
) || [];

document.addEventListener(
"DOMContentLoaded",
()=>{

    let productInput =
    document.getElementById(
        "offerProductName"
    );

    let suggestionsBox =
    document.getElementById(
        "offerProductSuggestions"
    );

    if(
        !productInput ||
        !suggestionsBox
    ){
        return;
    }

    productInput.addEventListener(
    "input",
    ()=>{

        let value =

        productInput.value
        .trim()
        .toLowerCase();

        suggestionsBox.innerHTML = "";

        if(value === ""){

            suggestionsBox.style.display =
            "none";

            return;

        }

        let matches =

        products.filter(

            p =>

            p.name
            .toLowerCase()
            .includes(value)

        );

        if(matches.length === 0){

            suggestionsBox.style.display =
            "none";

            return;

        }

        matches.forEach(product=>{

            let item =
            document.createElement(
                "div"
            );

            item.className =
            "suggestion-item";

            item.textContent =
            product.name;

            item.onclick = ()=>{

                document.getElementById(
                    "offerProductCode"
                ).value =
                product.code;

                document.getElementById(
                    "offerProductName"
                ).value =
                product.name;

                document.getElementById(
                    "offerProductDisplayName"
                ).value =
                product.name;

                document.getElementById(
                    "offerScientific"
                ).value =
                product.scientific;

                document.getElementById(
                    "offerForm"
                ).value =
                product.form;

                document.getElementById(
                    "offerCompany"
                ).value =
                product.company || "";

                suggestionsBox.innerHTML =
                "";

                suggestionsBox.style.display =
                "none";

            };

            suggestionsBox.appendChild(
                item
            );

        });

        suggestionsBox.style.display =
        "block";

    });

});// =========================
// حفظ العرض في الدفعة الحالية
// =========================

function saveOffer(){

    let code =
    document.getElementById(
        "offerProductCode"
    )?.value.trim();

    let name =
    document.getElementById(
        "offerProductName"
    )?.value.trim();

    if(
        code === "" ||
        name === ""
    ){

        alert(
            "يرجى اختيار المنتج أولاً"
        );

        return;

    }

    let offerData = {

        code:
        code,

        name:
        name,

        company:
        document.getElementById(
            "filterCompany"
        )?.value || "",

        province:
        document.getElementById(
            "offerProvinceSelect"
        )?.value || "",

        user:
        document.getElementById(
            "offerUserSelect"
        )?.value || "",

        scientific:
        document.getElementById(
            "offerScientific"
        )?.value || "",

        form:
        document.getElementById(
            "offerForm"
        )?.value || "",

        qty1:
        document.getElementById(
            "qty1"
        )?.value || "",

        offer1:
        document.getElementById(
            "offer1"
        )?.value || "",

        qty2:
        document.getElementById(
            "qty2"
        )?.value || "",

        offer2:
        document.getElementById(
            "offer2"
        )?.value || "",

        qty3:
        document.getElementById(
            "qty3"
        )?.value || "",

        offer3:
        document.getElementById(
            "offer3"
        )?.value || "",

        qty4:
        document.getElementById(
            "qty4"
        )?.value || "",

        offer4:
        document.getElementById(
            "offer4"
        )?.value || "",

        offerEndDate:
        document.getElementById(
            "offerEndDate"
        )?.value || ""

    };

    let currentBatch =

    JSON.parse(

        localStorage.getItem(
            "currentOffersBatch"
        )

    ) || [];

    currentBatch.push(
        offerData
    );

    localStorage.setItem(

        "currentOffersBatch",

        JSON.stringify(
            currentBatch
        )

    );

    document.getElementById(
        "offerResult"
    ).innerHTML =

    "✅ تمت إضافة المنتج إلى الدفعة الحالية";

    loadOffersTable();

}
// =========================
// جدول الدفعة الحالية
// =========================

function loadOffersTable(){

    let table =
    document.getElementById(
        "offersTableBody"
    );

    if(!table) return;

    table.innerHTML = "";

    let currentBatch =

    JSON.parse(

        localStorage.getItem(
            "currentOffersBatch"
        )

    ) || [];

    currentBatch.forEach(offer=>{

        table.innerHTML += `

<tr>

<td>${offer.code || ""}</td>

<td>${offer.name || ""}</td>

<td>${offer.province || ""}</td>

<td>${offer.user || ""}</td>

<td>${offer.qty1 || ""}</td>
<td>${offer.offer1 || ""}</td>

<td>${offer.qty2 || ""}</td>
<td>${offer.offer2 || ""}</td>

<td>${offer.qty3 || ""}</td>
<td>${offer.offer3 || ""}</td>

<td>${offer.qty4 || ""}</td>
<td>${offer.offer4 || ""}</td>

<td>${offer.offerEndDate || ""}</td>

</tr>

`;

    });

}


// =========================
// تحميل الجدول
// =========================

document.addEventListener(
"DOMContentLoaded",
loadOffersTable
);


// =========================
// Enter للتنقل
// =========================

document.addEventListener(
"keydown",
function(e){

    if(e.key !== "Enter")
    return;

    let formElements =

    Array.from(

        document.querySelectorAll(
            "input,select,button"
        )

    ).filter(

        el =>

        el.offsetParent !== null

    );

    let index =

    formElements.indexOf(
        document.activeElement
    );

    if(

        index > -1 &&

        index < formElements.length - 1

    ){

        e.preventDefault();

        formElements[
            index + 1
        ].focus();

    }

});// =========================
// استيراد عروض Excel
// =========================

document
.getElementById("offersExcelFile")
?.addEventListener(
"change",
function(e){

    let file =
    e.target.files[0];

    if(!file) return;

    let reader =
    new FileReader();

    reader.onload =
    function(event){

        let data =
        new Uint8Array(
            event.target.result
        );

        let workbook =
        XLSX.read(
            data,
            {
                type:"array"
            }
        );

        let sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

        let rows =
        XLSX.utils
        .sheet_to_json(
            sheet
        );

        let currentBatch =

        JSON.parse(

            localStorage.getItem(
                "currentOffersBatch"
            )

        ) || [];

        let importedCount = 0;

        rows.forEach(row=>{

            let code =
            String(
                row["كود المنتج"] || ""
            ).trim();

            let name =
            String(
                row["اسم المنتج"] || ""
            ).trim();

            if(name === "")
            return;

            currentBatch.push({

                code:
                code,

                name:
                name,

                company:
                row["الشركة"] || "",

                province:
                row["المحافظة"] || "",

                user:
                row["المندوب"] || "",

                scientific:
                row["الاسم العلمي"] || "",

                form:
                row["الشكل الصيدلاني"] || "",

                qty1:
                row["العدد1"] || "",

                offer1:
                row["العرض1"] || "",

                qty2:
                row["العدد2"] || "",

                offer2:
                row["العرض2"] || "",

                qty3:
                row["العدد3"] || "",

                offer3:
                row["العرض3"] || "",

                qty4:
                row["العدد4"] || "",

                offer4:
                row["العرض4"] || "",

                offerEndDate:
                row["تاريخ الانتهاء"] || ""

            });

            importedCount++;

        });

        localStorage.setItem(

            "currentOffersBatch",

            JSON.stringify(
                currentBatch
            )

        );

        loadOffersTable();

        alert(

            "تم استيراد " +

            importedCount +

            " عرض بنجاح"

        );

    };

    reader.readAsArrayBuffer(
        file
    );

});// =========================
// المستخدمون
// =========================

let users =
JSON.parse(
    localStorage.getItem("users")
) || [];

// =========================
// توليد كود المستخدم
// =========================

function generateUserCode(){

    let maxNumber = 0;

    users.forEach(user => {

        let num = parseInt(
            user.code.replace("USR","")
        );

        if(num > maxNumber){

            maxNumber = num;

        }

    });

    return "USR" +

    String(
        maxNumber + 1
    ).padStart(6,"0");

}


// =========================
// استدعاء المستخدم من الاسم
// =========================

document
.getElementById("fullName")
?.addEventListener(
"input",
function(){

    let name =
    this.value.trim();

    if(name === "")
    return;

    let user =
    users.find(

        u =>

        u.fullName
        .toLowerCase() ===

        name
        .toLowerCase()

    );

    if(user){

        document.getElementById(
            "userCode"
        ).value =
        user.code;

        document.getElementById(
            "userName"
        ).value =
        user.userName;

        document.getElementById(
            "userPassword"
        ).value =
        user.password;

        document.getElementById(
            "userPhone"
        ).value =
        user.phone;

        document.getElementById(
            "userProvince"
        ).value =
        user.province;

        document.getElementById(
            "userStatus"
        ).value =
        user.status;

        document.getElementById(
            "userResult"
        ).innerHTML =

        "✏️ تم استدعاء المستخدم للتعديل";

    }else{

        let cleanName =

        name.replace(
            /\s+/g,
            ""
        );

        document.getElementById(
            "userCode"
        ).value =

        generateUserCode();

        document.getElementById(
            "userName"
        ).value =

        cleanName.toLowerCase() +

        Math.floor(
            100 +
            Math.random()*900
        );

        document.getElementById(
            "userPassword"
        ).value =

        generatePassword();

    }

});

// =========================
// بدء الصفحة
// =========================

document.addEventListener(
"DOMContentLoaded",
()=>{

    if(
        document.getElementById(
            "userCode"
        )
    ){

        document.getElementById(
            "userCode"
        ).value =

        generateUserCode();

    }

    document
    .getElementById(
        "saveUserBtn"
    )
    ?.addEventListener(

        "click",

        saveUser

    );

    loadUsersStats();

});
// =========================
// حفظ المستخدم
// =========================

function saveUser(){

    let fullName =
    document.getElementById(
        "fullName"
    ).value.trim();

    let userName =
    document.getElementById(
        "userName"
    ).value.trim();

    let password =
    document.getElementById(
        "userPassword"
    ).value.trim();

    let phone =
    document.getElementById(
        "userPhone"
    ).value.trim();

    let province =
    document.getElementById(
        "userProvince"
    ).value;

    let status =
    document.getElementById(
        "userStatus"
    ).value;

    if(

        fullName === "" ||

        userName === "" ||

        password === "" ||

        province === ""

    ){

        alert(
            "يرجى إكمال البيانات"
        );

        return;

    }

    let userData = {

        code:
        document.getElementById(
            "userCode"
        ).value,

        fullName:
        fullName,

        userName:
        userName,

        password:
        password,

        phone:
        phone,

        province:
        province,

        status:
        status

    };

    let existingIndex =

    users.findIndex(

        u =>

        u.fullName
        .toLowerCase() ===

        fullName
        .toLowerCase()

    );

    if(existingIndex > -1){

        users[existingIndex] =
        userData;

        document.getElementById(
            "userResult"
        ).innerHTML =

        "✏️ تم تعديل المستخدم بنجاح";

    }else{

        users.push(
            userData
        );

        document.getElementById(
            "userResult"
        ).innerHTML =

        "✅ تم إضافة المستخدم بنجاح";

    }

    localStorage.setItem(

        "users",

        JSON.stringify(
            users
        )

    );

    clearUserForm();

}

// =========================
// تفريغ النموذج
// =========================

function clearUserForm(){

    document.getElementById(
        "userCode"
    ).value =

    generateUserCode();

    document.getElementById(
        "fullName"
    ).value = "";

    document.getElementById(
        "userName"
    ).value = "";

    document.getElementById(
        "userPassword"
    ).value = "";

    document.getElementById(
        "userPhone"
    ).value = "";

    document.getElementById(
        "userProvince"
    ).selectedIndex = 0;

    document.getElementById(
        "userStatus"
    ).value = "فعال";

}
// =========================
// تبويبات الشركات والمنتجات والعروض
// =========================

const companiesTab =
document.getElementById(
    "companiesTab"
);

const productsTab =
document.getElementById(
    "productsTab"
);

const generalOffersTab =
document.getElementById(
    "generalOffersTab"
);

const specialOffersTab =
document.getElementById(
    "specialOffersTab"
);

const companiesSection =
document.getElementById(
    "companiesSection"
);

const productsSection =
document.getElementById(
    "productsSection"
);

const generalOffersSection =
document.getElementById(
    "generalOffersSection"
);

const specialOffersSection =
document.getElementById(
    "specialOffersSection"
);


// =========================
// إخفاء جميع الأقسام
// =========================

function hideAllSections(){

    if(companiesSection)
    companiesSection.style.display =
    "none";

    if(productsSection)
    productsSection.style.display =
    "none";

    if(generalOffersSection)
    generalOffersSection.style.display =
    "none";

    if(specialOffersSection)
    specialOffersSection.style.display =
    "none";

}


// =========================
// إزالة التفعيل
// =========================

function removeActiveTabs(){

    document
    .querySelectorAll(
        ".tab-btn"
    )
    .forEach(btn=>{

        btn.classList.remove(
            "active-tab"
        );

    });

}


// =========================
// تبويب الشركات
// =========================

companiesTab?.addEventListener(
"click",
()=>{

    hideAllSections();

    removeActiveTabs();

    companiesSection.style.display =
    "block";

    companiesTab.classList.add(
        "active-tab"
    );

});


// =========================
// تبويب المنتجات
// =========================

productsTab?.addEventListener(
"click",
()=>{

    hideAllSections();

    removeActiveTabs();

    productsSection.style.display =
    "block";

    productsTab.classList.add(
        "active-tab"
    );

});


// =========================
// تبويب العروض العامة
// =========================

generalOffersTab?.addEventListener(
"click",
()=>{

    hideAllSections();

    removeActiveTabs();

    generalOffersSection.style.display =
    "block";

    generalOffersTab.classList.add(
        "active-tab"
    );

});


// =========================
// تبويب العروض الخاصة
// =========================

specialOffersTab?.addEventListener(
"click",
()=>{

    hideAllSections();

    removeActiveTabs();

    specialOffersSection.style.display =
    "block";

    specialOffersTab.classList.add(
        "active-tab"
    );

});


// =========================
// Enter في صفحة المستخدمين
// =========================

document
.getElementById("fullName")
?.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .getElementById(
            "userName"
        )
        ?.focus();

    }

});

document
.getElementById("userName")
?.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .getElementById(
            "userPassword"
        )
        ?.focus();

    }

});

document
.getElementById("userPassword")
?.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .getElementById(
            "userPhone"
        )
        ?.focus();

    }

});

document
.getElementById("userPhone")
?.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .getElementById(
            "userProvince"
        )
        ?.focus();

    }

});

document
.getElementById("userProvince")
?.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .getElementById(
            "userStatus"
        )
        ?.focus();

    }

});

document
.getElementById("userStatus")
?.addEventListener(
"keydown",
function(e){

    if(e.key==="Enter"){

        e.preventDefault();

        document
        .getElementById(
            "saveUserBtn"
        )
        ?.focus();

    }

});// =========================
// توليد كلمة المرور
// =========================

function generatePassword(){

    let chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$";

    let pass = "";

    for(let i=0;i<10;i++){

        pass += chars.charAt(

            Math.floor(
                Math.random() *
                chars.length
            )

        );

    }

    return pass;

}// =========================
// اقتراحات المستخدمين
// =========================

document
.getElementById("fullName")
?.addEventListener(
"input",
function(){

    let value =
    this.value
    .trim()
    .toLowerCase();

    let suggestionsBox =
    document.getElementById(
        "userSuggestions"
    );

    if(!suggestionsBox) return;

    suggestionsBox.innerHTML = "";

    if(value === ""){

        suggestionsBox.style.display =
        "none";

        return;

    }

    let matches = users.filter(

        user =>

        user.fullName
        .toLowerCase()
        .includes(value)

    );

    if(matches.length === 0){

        suggestionsBox.style.display =
        "none";

        return;

    }

    matches.forEach(user=>{

        let item =
        document.createElement(
            "div"
        );

        item.className =
        "suggestion-item";

        item.textContent =
        user.fullName;

        item.onclick = ()=>{

            document.getElementById(
                "fullName"
            ).value =
            user.fullName;

            document.getElementById(
                "userCode"
            ).value =
            user.code;

            document.getElementById(
                "userName"
            ).value =
            user.userName;

            document.getElementById(
                "userPassword"
            ).value =
            user.password;

            document.getElementById(
                "userPhone"
            ).value =
            user.phone;

            document.getElementById(
                "userProvince"
            ).value =
            user.province;

            document.getElementById(
                "userExpireDate"
            ).value =
            user.expireDate || "";

            suggestionsBox.style.display =
            "none";

        };

        suggestionsBox.appendChild(
            item
        );

    });

    suggestionsBox.style.display =
    "block";

});

document.addEventListener(
"click",
(e)=>{

    let suggestionsBox =
    document.getElementById(
        "userSuggestions"
    );

    let fullName =
    document.getElementById(
        "fullName"
    );

    if(
        !suggestionsBox ||
        !fullName
    ) return;

    if(
        e.target !== fullName &&
        !suggestionsBox.contains(
            e.target
        )
    ){

        suggestionsBox.style.display =
        "none";

    }

});