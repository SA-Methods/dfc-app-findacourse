var filterService;
$(document).ready(function () {
    filterService = new FilterService("#course-results", "/find-a-course/course/RetrieveFilteredCourses");
    var distanceElement = document.getElementById("DistanceValue");
    $(distanceElement).on("change", function () { return CallAPI(); });
});
function CallAPI() {
    filterService.FilterData(GetCurrentStateOfFilters());
}
function GetCurrentStateOfFilters() {
    var returnStateType;
    //let location = document.getElementById("");
    // let distance = (<HTMLSelectElement>document.getElementById("DistanceValue"));
    //let courseType = document.getElementById("");
    var distance = $("#DistanceValue option:selected").val();
    var searchTerm = $("#CurrentSearchTerm").text();
    var currentPage = $("#CurrentPage").text();
    returnStateType = "searchTerm=" + searchTerm + "&distance=" + distance + "&page=" + currentPage;
    return returnStateType;
}
//# sourceMappingURL=findACourse.js.map