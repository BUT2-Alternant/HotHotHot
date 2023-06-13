document.getElementById('sidebar-toggle').addEventListener('click', function() {
    var button = document.getElementById('sidebar-toggle');
    var sidebar = document.getElementById('sidebar');
    var isOpen = sidebar.classList.contains('open');

    if (!isOpen) {
        sidebar.style.left = '0';
        button.style.transition = 'left 0.3s ease-in-out';
        button.style.left = '16rem';
        button.innerHTML = "<i class='fa fa-times icon-sidebar' aria-hidden='true'></i>";
        sidebar.classList.add('open');
    } else {
        sidebar.style.left = '-16em';
        button.style.transition = 'left 0.3s ease-in-out';
        button.style.left = '1rem';
        button.innerHTML = "<i class='fa fa-bars icon-sidebar' aria-hidden='true'></i>";
        sidebar.classList.remove('open');
    }
});