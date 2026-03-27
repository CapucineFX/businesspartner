document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dropdownMenuButton').addEventListener('click', function(event) {
        event.preventDefault();
        var dropdownContent = document.getElementById('dropdownContent');
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    document.getElementById('dropdownMenuButtonLarge').addEventListener('click', function(event) {
        event.preventDefault();
        var dropdownContent = document.getElementById('dropdownContentLarge');
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        var isClickInside = document.getElementById('dropdownMenuButton').contains(event.target) || 
                            document.getElementById('dropdownMenuButtonLarge').contains(event.target);
        if (!isClickInside) {
            document.getElementById('dropdownContent').style.display = 'none';
            document.getElementById('dropdownContentLarge').style.display = 'none';
        }
    });
});

function toggleNavbar() {
    var navbarCollapse = document.getElementById('navbarCollapse');
    navbarCollapse.style.display = navbarCollapse.style.display === 'block' ? 'none' : 'block';
}