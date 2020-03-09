var filterService;
$(document).ready(function () {
    filterService = new FilterService('/find-a-course/course/RetrieveFilteredCourses', 'get', '#course-results');
    $('select[name="SideBar.DistanceValue"]').on("change", function () { return CallAPI(); });
});
function CallAPI() {
    filterService.FilterData(GetCurrentStateOfFilters());
}
function GetCurrentStateOfFilters() {
    //let returnStateType: string;
    ////let location = document.getElementById("");
    //// let distance = (<HTMLSelectElement>document.getElementById("DistanceValue"));
    ////let courseType = document.getElementById("");
    //let distance = $("#DistanceValue option:selected").val();
    //let searchTerm = $("#CurrentSearchTerm").text();
    //let currentPage = $("#CurrentPage").text();
    //returnStateType = "searchTerm=" + searchTerm + "&distance=" + distance + "&page=" + currentPage;
    //return returnStateType;
    return $('form').serialize();
}
//# sourceMappingURL=FindACourse.js.map