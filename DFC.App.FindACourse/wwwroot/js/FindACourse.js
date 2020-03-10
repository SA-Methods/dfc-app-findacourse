var filterService;
$(document).ready(function () {
    filterService = new FilterService('/find-a-course/course/RetrieveFilteredCourses', 'get', '#course-results');
    $('.govuk-select').on("change", function () { return CallAPI(); });
    $('.govuk-checkboxes__input').on("change", function () { return CallAPI(); });
});
function CallAPI() {
    filterService.FilterData(GetCurrentStateOfFilters());
}
function GetCurrentStateOfFilters() {
    return $('form').serialize();
}
//# sourceMappingURL=FindACourse.js.map