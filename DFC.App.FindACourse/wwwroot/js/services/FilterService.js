var FilterService = /** @class */ (function () {
    function FilterService(endPoint, type, outputId) {
        this.endPoint = endPoint;
        this.type = type;
        this.outputId = outputId;
    }
    FilterService.prototype.FilterData = function (paramFormData) {
        var formData = paramFormData;
        $.ajax({
            type: this.type,
            url: this.endPoint,
            data: formData,
            success: function (data) {
                $('#course-results').empty();
                $('#course-results').html(data);
                console.log(data.Results.ResultProperties.TotalResultCount);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };
    return FilterService;
}());
//# sourceMappingURL=FilterService.js.map