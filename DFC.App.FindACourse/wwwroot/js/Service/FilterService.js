var FilterService = /** @class */ (function () {
    function FilterService(bodyId, endPoint) {
        this.endPoint = endPoint;
        this.body = document.getElementById(bodyId);
    }
    FilterService.prototype.FilterData = function (params) {
        $.ajax({
            type: "GET",
            url: this.endPoint + "?" + params,
            success: function (data) {
                $("#course-results").empty();
                $("#course-results").html(data);
            }
        });
    };
    return FilterService;
}());
//# sourceMappingURL=FilterService.js.map