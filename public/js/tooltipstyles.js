document.addEventListener('DOMContentLoaded', function() {
    let tooltipParents = document.querySelectorAll('.tooltip-parent');

    tooltipParents.forEach(function(parent) {
        let tooltipContainer = parent.querySelector('.tooltip-text');
        parent.addEventListener('mouseover', function() {
            tooltipContainer.style.visibility = 'visible';
            tooltipContainer.style.opacity = '1';
        });

        parent.addEventListener('mouseout', function() {
            tooltipContainer.style.visibility = 'hidden';
            tooltipContainer.style.opacity = '0';
        });
    });
});