var body = document.querySelector('body'),
      nav_links = body.querySelectorAll(".link");

// переход к какой-то странице
var navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

// создание запроса
function CreateRequest()
{
    let Request = null;

    if (window.XMLHttpRequest)
    {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        //Internet explorer
        try
        {
             Request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (CatchException)
        {
             Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request)
    {
        alert("Невозможно создать XMLHttpRequest");
    }

    return Request;
}


/*
Функция запроса к серверу
r_method  - тип запроса: GET или POST
r_path    - путь к файлу
r_args    - аргументы вида a=1&b=2&c=3...
r_handler - функция-обработчик ответа от сервера
*/
function SendRequest(r_method, r_path, r_args, r_handler)
{
    //Создаём запрос
    let Request = CreateRequest();

    //Проверяем существование запроса еще раз
    if (!Request)
    {
        return;
    }

    //Назначаем пользовательский обработчик
    Request.onreadystatechange = function()
    {
        //Если обмен данными завершен
        if (Request.readyState === 4)
        {
            if (Request.status === 200){
                r_handler(Request);
            }
            //Передаем управление обработчику пользователя
            else {
                alert('неудачный запрос')
            }
        }
    }

    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() === "get") {
        if (r_args) {
            r_path += "?" + r_args;
        }
        //Инициализируем соединение
        Request.open(r_method, r_path, true);
    }

    if (r_method.toLowerCase() === "post")
    {
        //Если это POST-запрос
        //устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else
    {
        //Если это GET-запрос

        //Посылаем нуль-запрос
        Request.send(null);
    }
}

// вызывается при каждом переходе по страницам
var router = async () => {
    // возможные пути
    const routes = [
        { path: "/", view: () => console.log('main')},
        { path: "/notifications", view: () => console.log('notifications')},
        { path: "/tasks", view: () => console.log('tasks')},
        { path: "/mail", view: () => console.log('mail')}
    ];

    const potentialMatches = routes.map(route => {
       return {
           route: route,
           isMatch: location.pathname === route.path
       };
    });

    // текущий путь
    let match = potentialMatches.find(potentialMatches => potentialMatches.isMatch);

    // Отправляем запрос по нужному пути и передаем в обработчик
    SendRequest('get', match.route.path, 'not_update', showPage);
};

// показ новой страницы
function showPage(page) {
    sidebar.classList.toggle("close");
    const newHTML = document.open("text/html", "replace");
    newHTML.write(page.response);
    newHTML.close();
}

// кнопочка назад
window.addEventListener("popstate", () => {
    router();
});

// при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    nav_links.forEach((link) => {
        link.addEventListener('click', e => {
            // отменить стандартное действие ссылки
            e.preventDefault();
            // перейти на страницу
            navigateTo(link.href);
        })
    })
});

console.log('SPA подгружен');
