let filterService;

$(document).ready(() => {
    filterService = new FilterService('/find-a-course/course/RetrieveFilteredCourses', 'get', '#course-results');
    $('.govuk-select').on("change", () => CallAPI());
    $('.govuk-checkboxes__input').on("change", () => CallAPI());
});

function CallAPI() {
    filterService.FilterData(GetCurrentStateOfFilters());
}

function GetCurrentStateOfFilters() {
    return $('form').serialize();
}