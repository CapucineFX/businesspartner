document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.flipButton').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            card.classList.add('flipped');
        });
    });

    document.querySelectorAll('.flipButtonBack').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const card = this.closest('.card');
            card.classList.remove('flipped');
        });
    });
});