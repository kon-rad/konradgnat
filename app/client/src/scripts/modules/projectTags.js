'use strict';

$(document).ready(() => {
    const showProjectsWithTag = (tagName) => {
        debugger;
        $('.portfolio-item').each(function (i, elem) {
            const tags = $(elem).data('allTags').split(',');
            if (tags.includes(tagName)) {
                $(elem).show();
                $(elem)
                    .find('.project__tag')
                    .each(function (i, tagElem) {
                        if ($(tagElem).data('projectTag') === tagName) {
                            $(tagElem).removeClass('inactive');
                        }
                    });
            }
        });
    };
    const hideProjectsWithTag = (tagName) => {
        $('.portfolio-item').each(function (i, elem) {
            const tags = $(elem).data('allTags').split(',');
            if (tags.includes(tagName)) {
                $(elem)
                    .find('.project__tag')
                    .each(function (i, tagElem) {
                        if ($(tagElem).data('projectTag') === tagName) {
                            $(tagElem).addClass('inactive');
                        }
                    });
                $(elem).hide();
            }
        });
    };

    // select all tags
    $('.tags__select_all').click(() => {
        $('.tags__wrapper .project__tag').each(function (i, elem) {
            const tagName = $(elem).data('tag');
            showProjectsWithTag(tagName);
        });
        $('.project__tag').removeClass('inactive');
    });

    // clear all selected tags
    $('.tags__clear_all').click(() => {
        $('.tags__wrapper .project__tag').each(function (i, elem) {
            const tagName = $(elem).data('tag');
            hideProjectsWithTag(tagName);
        });
        $('.project__tag').addClass('inactive');
    });

    // individual tag selection
    $('.tags__wrapper .project__tag').click(function (event) {
        const tagName = event.target.attributes['data-tag'].value;
        if ($(this).hasClass('inactive')) {
            showProjectsWithTag(tagName);
            $(this).removeClass('inactive');
        } else {
            hideProjectsWithTag(tagName);
            $(this).addClass('inactive');
        }
    });
});
