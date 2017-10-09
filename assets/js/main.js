$(function () {

    var cards = ['about-me', 'skills', 'projects', 'education', 'work'];
    var skillTypes = ['skill-general', 'skill-web',
                      'exp-pro-oneyr', 'exp-other-oneyr'];

    // events that happen on loading the page
    $(document).ready(function () {

        console.log('ayo'); // a little inside joke, ignore it

        updateNavBarHighlight();

        // set click events for each nav bar item
        cards.forEach(function (card) {
            // flip the correct card into view
            $('#nav-flip-' + card).click(function () {
                if($('#' + card).hasClass('hidden')) {
                    hideAllCards();
                    highlightNavFlipperItem(card);
                    $('#' + card).attr('class', 'card visible');

                }
            });
            // scroll to the correct card
            $('#nav-' + card).click(function () {
                // since this is dynamic, need to re-generate card str
                var card = this.id.substring(4, this.id.length);
                scrollToCard(card);
                highlightNavItem(card);
            });
            $('#nav-side-' + card).click(function () {
                // since this is dynamic, need to re-generate card str
                var card = this.id.substring(9, this.id.length);
                $('#nav-side').attr('class', 'side hidden');
                scrollToCard(card);
            });
        });

        // set click events for each radio button
        skillTypes.forEach(function (skillType) {
            $('#' + skillType).click(function () {
                if ($('#' + skillType).hasClass('checked')) {
                    $('#' + skillType).attr('class', '');
                } else {
                    $('#' + skillType).attr('class', 'checked');
                }
                updateSelectedSkills();
            });
        });

        // click event for revealing relevant courses in education section
        $('#expand-relevant-courses').click(function () {
            $('#courses-list').attr('class', '');
            $(this).hide(); // remove button
        });

        // click event for revealing more work details in work section
        $('#expand-work-details').click(function () {
            $('#work-details').attr('class', '');
            $(this).hide(); // remove button
        });

        $('#hamburger-btn').click(function () {
            $('#nav-side').attr('class', 'side');
        });

        $('#nav-side-outside').click(function () {
            $('#nav-side').attr('class', 'side hidden');
        });

    });

    // scroll handling - wait for user to stop scrolling before firing
    var scrollTimeout;
    $(window).scroll(function () {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
        // trigger scroll event after timeout
        scrollTimeout = setTimeout(function () {
            updateNavBarHighlight();
        }, 200);
    });


    /* HELPERS */

    function hideAllCards() {
        cards.forEach(function (card) {
            $('#' + card).attr('class', 'card hidden');
        });
    }

    function highlightNavItem(item) {
        cards.forEach(function (card) {
            $('#nav-' + card).attr('class', 'nav-item');
        });
        $('#nav-' + item).attr('class', 'nav-item selected');
    }

    function highlightNavFlipperItem(item) {
        cards.forEach(function (card) {
            $('#nav-flip-' + card).attr('class', 'nav-item');
        });
        $('#nav-flip-' + item).attr('class', 'nav-item selected');
    }


    function scrollToCard(card) {
        $('html, body').animate(
            { scrollTop: $('#' + card).offset().top - 108 },
            800,
            function () {  }
        );
    };

    function updateNavBarHighlight() {
        var pos = window.scrollY;
        var offset = 374;
        if (pos < $('#skills').offset().top - offset) {
            highlightNavItem('about-me');
        } else if (pos < $('#projects').offset().top - offset) {
            highlightNavItem('skills');
        } else if (pos < $('#education').offset().top - offset) {
            highlightNavItem('projects');
        } else if (pos < $('#work').offset().top - offset) {
            highlightNavItem('education');
        } else {
            highlightNavItem('work');
        }
    }

    function updateSelectedSkills() {
        var selectedTypes = [];
        skillTypes.forEach(function (skillType) {
            if ($('#' + skillType).hasClass('checked')) {
                selectedTypes.push(skillType);
            }
        });
        $('li.skill-item').each(function () {
            console.log(this);
            var thisItem = this;
            var toSelect = selectedTypes.length > 0;
            selectedTypes.forEach(function (selectedType) {
                console.log(thisItem.dataset.skilltype);
                if (thisItem.dataset.skilltype.indexOf(selectedType) == -1) {
                    toSelect = false;
                }
            });
            if (toSelect) {
                $(thisItem).attr('class', 'skill-item selected');
            } else {
                $(thisItem).attr('class', 'skill-item');
            }
        });
    }

});
